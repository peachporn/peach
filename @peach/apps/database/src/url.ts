import assert from "assert";

assert(process.env.DB_USER, "DB_USER is required");
assert(process.env.DB_PASSWORD, "DB_PASSWORD is required");
assert(process.env.DB_HOST, "DB_HOST is required");
assert(process.env.DB_PORT, "DB_PORT is required");
assert(process.env.DB_DATABASE, "DB_DATABASE is required");

export const url = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
