import { validationResult } from 'express-validator';
import { pool } from '../db.js';

export const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
}

export const checkOrderExists = async (req, res, next) => {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
    if (rows.length === 0) {
        return res.status(404).json({ message: `Order with id ${id} was not found` });
    }
    next();
}