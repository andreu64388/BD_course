import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Music_BD",
  password: "Ghtyuioplm",
  port: 5432,
});

export default pool;
