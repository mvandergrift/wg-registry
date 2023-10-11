import { click_client } from "../db/cn";
import type { ApiRow } from "../types";

export async function fetchApiData(): Promise<ApiRow[]> {
    const client = click_client;
    
    const resultSet = await client.query({
        query: `
            select 
                SpanAttributes['wg.operation.name'] op_name, 
                SpanAttributes['wg.operation.content'] op_contents,
                SpanAttributes['wg.operation.hash'] op_id,
                SpanAttributes['wg.federated_graph.id'] federated_graph_id,
                Duration op_duration
            from 
                cosmo.otel_traces where op_name > ''                 
                and op_name <> 'IntrospectionQuery'
                and op_contents > ''
            order by Timestamp desc
        `,
        format: "JSONEachRow"
    });

    const dataset = await resultSet.json<ApiRow[]>();    
    return dataset;
}