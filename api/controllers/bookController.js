const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

exports.createBook = async (req, res) => {
    const { title, synopsis } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO books (title, synopsis, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *',
            [title, synopsis]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM books');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, synopsis } = req.body;
    try {
        const result = await pool.query(
            'UPDATE books SET title = $1, synopsis = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
            [title, synopsis, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [
            id,
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};