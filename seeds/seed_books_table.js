const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

const seedBooks = async () => {
    try {
        await pool.query(`
      INSERT INTO books (title, synopsis)
      VALUES
        ('Book 1', 'This is the synopsis of Book 1'),
        ('Book 2', 'This is the synopsis of Book 2'),
        ('Book 3', 'This is the synopsis of Book 3'),
        ('Book 4', 'This is the synopsis of Book 4'),
        ('Book 5', 'This is the synopsis of Book 5'),
        ('Book 6', 'This is the synopsis of Book 6'),
        ('Book 7', 'This is the synopsis of Book 7'),
        ('Book 8', 'This is the synopsis of Book 8'),
        ('Book 9', 'This is the synopsis of Book 9'),
        ('Book 10', 'This is the synopsis of Book 10')
    `);
        console.log('Books table seeded successfully!');
    } catch (error) {
        console.error('Error seeding books table:', error);
    } finally {
        pool.end();
    }
};

module.exports = { seedBooks };