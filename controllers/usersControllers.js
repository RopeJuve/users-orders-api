import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT o.id as order_id, u.first_name, u.last_name, o.price, o.date
       FROM users AS u
       JOIN orders AS o ON u.id = o.user_id
       WHERE o.user_id = $1`,
      [id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const checkActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT u.active
       FROM users AS u
       JOIN orders AS o ON u.id = o.user_id
       WHERE o.user_id = $1`,
      [id]
    );
    if (rows.length === 0) {
      const { rows } = await pool.query(
        "UPDATE users SET active = false WHERE id = $1 RETURNING *",
        [id]
      );
      return res.json({ active: rows[0].active });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO users (first_name,last_name, email) VALUES ($1, $2, $3) RETURNING *",
      [first_name, last_name, email]
    );
    res.status(201).json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;
    const { rows } = await pool.query(
      "UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *",
      [first_name, last_name, email, id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: `User with id ${id} was deleted` });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
