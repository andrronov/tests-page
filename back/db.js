import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: "cska1911",
  host: "localhost",
  port: 5432,
  database: "test_postgre"
});

export default pool;