const SessionRepository = require('../../Domain/sessionRepository');
const Session = require('../../Domain/session');
const db = require('../../../../core/db');

class MySQLSessionAdapter extends SessionRepository {
  async create({ table_id, waiter_id }) {
    const result = await db.executePreparedQuery(
      'INSERT INTO sessions (table_id, waiter_id) VALUES (?, ?)',
      [table_id, waiter_id]
    );

    const rows = await db.fetchRows(
      'SELECT * FROM sessions WHERE id = ?',
      [result.insertId]
    );

    return new Session(rows[0]);
  }

  async findAll(filters = {}) {
    let query = `
      SELECT s.*, t.number AS table_number, e.name AS waiter_name
      FROM sessions s
      LEFT JOIN tables t ON s.table_id = t.id
      LEFT JOIN employees e ON s.waiter_id = e.id
    `;
    const params = [];

    if (filters.status) {
      query += ' WHERE s.status = ?';
      params.push(filters.status);
    }

    query += ' ORDER BY s.opened_at DESC';

    const rows = await db.fetchRows(query, params);
    return rows;
  }

  async findById(id) {
    const rows = await db.fetchRows(
      `SELECT s.*, t.number AS table_number, e.name AS waiter_name
       FROM sessions s
       LEFT JOIN tables t ON s.table_id = t.id
       LEFT JOIN employees e ON s.waiter_id = e.id
       WHERE s.id = ?`,
      [id]
    );

    if (rows.length === 0) return null;
    return rows[0];
  }

  async close(id) {
    await db.executePreparedQuery(
      'UPDATE sessions SET status = ?, closed_at = NOW() WHERE id = ?',
      ['closed', id]
    );

    const rows = await db.fetchRows(
      `SELECT s.*, t.number AS table_number, e.name AS waiter_name
       FROM sessions s
       LEFT JOIN tables t ON s.table_id = t.id
       LEFT JOIN employees e ON s.waiter_id = e.id
       WHERE s.id = ?`,
      [id]
    );

    return rows[0];
  }

  async findOpenByTableId(tableId) {
    const rows = await db.fetchRows(
      'SELECT * FROM sessions WHERE table_id = ? AND status = ?',
      [tableId, 'open']
    );

    if (rows.length === 0) return null;
    return new Session(rows[0]);
  }

  async tableExists(tableId) {
    const rows = await db.fetchRows(
      'SELECT * FROM tables WHERE id = ? AND is_active = ?',
      [tableId, 1]
    );

    return rows.length > 0;
  }
}

module.exports = MySQLSessionAdapter;
