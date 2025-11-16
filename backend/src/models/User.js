const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create({ email, password, full_name, phone, role = 'user' }) {
    const password_hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, full_name, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, full_name, phone, role, created_at',
      [email, password_hash, full_name, phone, role]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT id, email, full_name, phone, role, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query(
      'SELECT id, email, full_name, phone, role, created_at FROM users ORDER BY created_at DESC'
    );
    return result.rows;
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
