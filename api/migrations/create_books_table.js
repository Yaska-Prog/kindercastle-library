const { Pool } = require('pg');
require('dotenv').config();
const { seedBooks } = require('../seeds/seed_books_table');

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

const up = async () => {
    try {
        await pool.query(`
      CREATE TABLE books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        synopsis TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
        const result = await pool.query('SELECT * FROM information_schema.tables WHERE table_name = $1', ['books']);
        console.log('Books table created successfully!');
        console.log(result.rows);
        await seedBooks();
        const resultQuery = await pool.query('SELECT * FROM books');
        console.log(resultQuery);
    } catch (error) {
        console.error('Error creating books table:', error);
    } finally {
        pool.end();
    }
};

const down = async () => {
    try {
        await pool.query('DROP TABLE IF EXISTS books');
        console.log('Books table dropped successfully!');
    } catch (error) {
        console.error('Error dropping books table:', error);
    } finally {
        pool.end();
    }
};

up();