import pino from "pino";

import { wg_cn } from "./cn";
import { selectionsFromOpText } from "../graph/parser";

import type { ApiRow } from "../types";

const logger = pino({});
const COMMIT_BUFFER_THRESHOLD = 10;

export async function updateRegistry(dataset: ApiRow[]) {
    const apiTable = wg_cn("api");
    const apiAccessTable = wg_cn("api_access");

    const dbOperations: Promise<unknown>[] = [];

    for (let i = 0; i < dataset.length; i++) {
        const row = dataset[i];
        try {
            // parase operation to get the selection names
            if (row.op_contents) {                
                const selections = selectionsFromOpText(row.op_contents);

                for (const selection of selections) {
                    logger.info(`Found ${selection.name.value}`);
                    
                    dbOperations.push(apiTable.insert({
                        federated_graph_id: row.federated_graph_id,
                        api_name: selection.name.value,
                    })                    
                        .onConflict("api_name")
                        .ignore());                        
                                                            
                    dbOperations.push(apiAccessTable.insert({
                        api_name: selection.name.value,
                        operation_name: row.op_name,
                        operation_id: row.op_id,
                        duration: row.op_duration,
                        federated_graph_id: row.federated_graph_id,
                        access_time: new Date()
                    })
                        .onConflict(["api_name", "operation_id"])
                        .merge(["duration", "access_time"]));
                }
            }

            if (i % COMMIT_BUFFER_THRESHOLD === 0) {
                logger.info(`Processing ${i} of ${dataset.length}`);
                await Promise.all(dbOperations);
                dbOperations.length = 0;
            }

        } catch (e) {
            logger.error(`Error ${e}`);
        }
    }

    wg_cn.destroy();
}
