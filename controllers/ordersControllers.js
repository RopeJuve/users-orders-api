import { pool } from "../db.js";

export const getOrders = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM orders");
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM orders WHERE id = $1", [
      id,
    ]);
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const createOrder = async (req, res) => {
  try {
    const { price, date, user_id } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *",
      [price, date, user_id]
    );
    res.status(201).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, date, user_id } = req.body;
    const { rows } = await pool.query(
      "UPDATE orders SET price = $1, date = $2, user_id = $3 WHERE id = $4 RETURNING *",
      [price, date, user_id, id]
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM orders WHERE id = $1", [id]);
    res.json({ message: `Order with id ${id} was deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
