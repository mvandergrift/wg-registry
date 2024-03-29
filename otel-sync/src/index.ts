import dotenv from "dotenv";
import pino from "pino";

import { fetchApiData } from "./db/click";
import { updateRegistry } from "./db/registry";

const logger = pino({});

async function main() {
    logger.info("Starting API Registry Update");
    const dataset = await fetchApiData();
    await updateRegistry(dataset);
    logger.info("Finished API Registry Update");
}


dotenv.config();
main();
