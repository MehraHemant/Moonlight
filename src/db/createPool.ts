import mysql, { Pool } from 'mysql2/promise'

const createPool = ()=> {
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: parseInt(process.env.MYSQL_PORT || "3306"),
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: parseInt(process.env.MYSQL_MAX_CONNECTION || "3"),
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  });
  return pool;
}



let pool: Pool;
if (process.env.NODE_ENV !== 'production') {
  if (!(global as any).pool) {
    (global as any).pool = createPool();
  }
  pool = (global as any).pool
} else {
    pool = createPool();
}
export default pool;