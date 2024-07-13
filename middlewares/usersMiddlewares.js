import { validationResult } from "express-validator";
import { pool } from "../db.js";

export const modifyBody = (req, res, next) => {
  const { first_name, last_name, email } = req.body;
  if (first_name && last_name) {
    req.body.first_name =
      first_name.charAt(0).toUpperCase() + first_name.slice(1).toLowerCase();
    req.body.last_name =
      last_name.charAt(0).toUpperCase() + last_name.slice(1).toLowerCase();
  }

  if (email) {
    req.body.email = email.toLowerCase();
  }
  next();
};

export const checkId = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

export const checkUserBeforeCreate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  const { email } = req.body;
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (rows.length > 0) {
    return res.status(400).json({ error: "User already exists" });
  }
  next();
};

export const checkBeforeUpdate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

export const checkUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = rows[0];
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
