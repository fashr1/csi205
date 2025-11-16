const { pool } = require('../config/db');

class Station {
  static async create({ name, address, lat, lng, total_slots, price_per_hour, amenities = [] }) {
    const result = await pool.query(
      `INSERT INTO stations (name, address, lat, lng, total_slots, available_slots, price_per_hour, amenities) 
       VALUES ($1, $2, $3, $4, $5, $5, $6, $7) 
       RETURNING *`,
      [name, address, lat, lng, total_slots, price_per_hour, amenities]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM stations WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async getAll(filters = {}) {
    let query = 'SELECT * FROM stations WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (filters.status) {
      query += ` AND status = $${paramCount}`;
      params.push(filters.status);
      paramCount++;
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    return result.rows;
  }

  static async update(id, data) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(data[key]);
        paramCount++;
      }
    });

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);
    const query = `UPDATE stations SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM stations WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async updateAvailableSlots(id, change) {
    const result = await pool.query(
      'UPDATE stations SET available_slots = available_slots + $1 WHERE id = $2 RETURNING *',
      [change, id]
    );
    return result.rows[0];
  }
}

module.exports = Station;
