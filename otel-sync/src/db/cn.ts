/* eslint-disable @typescript-eslint/no-explicit-any */
import knex from "knex";
import dotenv from "dotenv";
import { createClient } from "@clickhouse/client"; // or '@clickhouse/client-web'

const CONNECTION_POOL_MIN = 10;
const CONNECTION_POOL_MAX = 10;

dotenv.config();  

export const wg_cn = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST ?? "",
    port: parseInt(process.env.DB_PORT ?? ""),
    user: process.env.DB_USER ?? "",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_DATABASE ?? "",
  },
  pool: {
    min: CONNECTION_POOL_MIN,
    max: CONNECTION_POOL_MAX,
    afterCreate: function(connection: any, callback: any) {      
      connection.query("SET TIME ZONE UTC;", function(err: any) {
        callback(err, connection);
      });
    }    
  }
});

export const click_client  = createClient({
    host: process.env.CLICKHOUSE_HOST ?? "",
    username: process.env.CLICKHOUSE_USER ?? "",
    password: process.env.CLICKHOUSE_PASSWORD ?? "",
});