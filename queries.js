import pg from "pg";

const { Pool } = pg;


const pool = new Pool({
    user: "me",
    host: "localhost",
    database: "api",
    password: "password",
    port: 5432,
});

if (pool) {
    console.log("Connected to database");
}

export default  pool ;
