import mysql from 'mysql';
import { config } from 'dotenv';
config();

const pool = mysql.createPool({
    host : process.env.db_host,
    port : process.env.db_port,
    user : process.env.db_user,
    password : process.env.password,
    database : process.env.db_name,
    connectionLimit : 1
});

export default pool;