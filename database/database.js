import pg from 'pg';
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const connection = new Pool(/*{
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '1510',
    database: 'projeto16-shortly'
  }*/{connectionString: process.env.DATABASE_URL,
  ssl:{
      rejectUnauthorized: false
  }
});



export default connection;