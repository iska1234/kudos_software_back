"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.pool = void 0;
require("dotenv/config");
const pg_1 = require("pg");
const dbConfig = {
    host: process.env["PGHOST"],
    port: Number(process.env["PGPORT"]),
    database: process.env["PGDATABASE"],
    user: process.env["PGUSER"],
    password: process.env["PGPASSWORD"],
};
exports.pool = new pg_1.Pool(dbConfig);
const query = (text, params) => {
    return exports.pool.query(text, params);
};
exports.query = query;
