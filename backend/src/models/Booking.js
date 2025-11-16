const { pool } = require('../config/db');

class Booking {
  static async create({ user_id, station_id, start_time, end_time, total_price }) {
    const result = await pool.query(
      `INSERT INTO bookings (user_id, station_id, start_time, end_time, total_price, status) 
       VALUES ($1, $2, $3, $4, $5, 'confirmed') 
       RETURNING *`,
      [user_id, station_id, start_time, end_time, total_price]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(
      `SELECT b.*, s.name as station_name, s.address, u.email, u.full_name 
       FROM bookings b
       JOIN stations s ON b.station_id = s.id
       JOIN users u ON b.user_id = u.id
       WHERE b.id = $1`,
      [id]
    );
    return result.rows[0];
  }

  static async getByUserId(user_id) {
    const result = await pool.query(
      `SELECT b.*, s.name as station_name, s.address, s.lat, s.lng 
       FROM bookings b
       JOIN stations s ON b.station_id = s.id
       WHERE b.user_id = $1
       ORDER BY b.created_at DESC`,
      [user_id]
    );
    return result.rows;
  }

  static async getAll() {
    const result = await pool.query(
      `SELECT b.*, s.name as station_name, s.address, u.email, u.full_name 
       FROM bookings b
       JOIN stations s ON b.station_id = s.id
       JOIN users u ON b.user_id = u.id
       ORDER BY b.created_at DESC`
    );
    return result.rows;
  }

  static async updateStatus(id, status) {
    const result = await pool.query(
      'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  }

  static async checkAvailability(station_id, start_time, end_time) {
    const result = await pool.query(
      `SELECT COUNT(*) as count FROM bookings 
       WHERE station_id = $1 
       AND status IN ('pending', 'confirmed')
       AND (
         (start_time <= $2 AND end_time > $2) OR
         (start_time < $3 AND end_time >= $3) OR
         (start_time >= $2 AND end_time <= $3)
       )`,
      [station_id, start_time, end_time]
    );
    return parseInt(result.rows[0].count) === 0;
  }
}

module.exports = Booking;
