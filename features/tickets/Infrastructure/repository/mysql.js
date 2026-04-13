const TicketRepository = require('../../Domain/ticketRepository');
const Ticket = require('../../Domain/ticket');
const db = require('../../../../core/db');

class MySQLTicketAdapter extends TicketRepository {

  async createTicket(ticketData) {
    try {
    const { session_id, waiter_id, tip = 0, discount = 0, notes = null } = ticketData;

    const validMethods = ['efectivo', 'tarjeta', 'transferencia', 'otro'];
    const payment_method = validMethods.includes(ticketData.payment_method)
      ? ticketData.payment_method
      : 'efectivo';

    // 1. Check session exists and is open
    const sessions = await db.executePreparedQuery(
      'SELECT * FROM sessions WHERE id = ?',
      [session_id]
    );

    if (!sessions || !sessions[0]) {
      const err = new Error('La sesión no existe');
      err.statusCode = 404;
      throw err;
    }

    if (sessions[0].status !== 'open') {
      const err = new Error('La sesión no está abierta');
      err.statusCode = 400;
      throw err;
    }

    // 2. Check no ticket already exists for this session
    const existingTickets = await db.executePreparedQuery(
      'SELECT id FROM tickets WHERE session_id = ?',
      [session_id]
    );

    if (existingTickets && existingTickets.length > 0) {
      const err = new Error('Ya existe un ticket para esta sesión');
      err.statusCode = 400;
      throw err;
    }

    // 3. Gather all delivered order_items from the session's orders
    const deliveredItems = await db.fetchRows(
      `SELECT oi.product_id, oi.product_name, oi.unit_price, oi.quantity
       FROM order_items oi
       INNER JOIN orders o ON oi.order_id = o.id
       WHERE o.session_id = ? AND oi.status = 'delivered'`,
      [session_id]
    );

    if (!deliveredItems || deliveredItems.length === 0) {
      const err = new Error('No hay items entregados en esta sesión');
      err.statusCode = 400;
      throw err;
    }

    // 4. Calculate subtotal
    let subtotal = 0;
    for (const item of deliveredItems) {
      subtotal += parseFloat(item.unit_price) * item.quantity;
    }
    subtotal = parseFloat(subtotal.toFixed(2));

    // 5. Calculate total
    const total = parseFloat((subtotal - parseFloat(discount) + parseFloat(tip)).toFixed(2));

    // 6. Insert ticket
    const ticketResult = await db.executePreparedQuery(
      `INSERT INTO tickets (session_id, waiter_id, subtotal, discount, tip, total, payment_method, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [session_id, waiter_id, subtotal, discount, tip, total, payment_method, notes]
    );

    const ticketId = ticketResult.insertId;

    // 7. Insert ticket_items (snapshot from delivered order_items)
    for (const item of deliveredItems) {
      const itemSubtotal = parseFloat((parseFloat(item.unit_price) * item.quantity).toFixed(2));
      await db.executePreparedQuery(
        `INSERT INTO ticket_items (ticket_id, product_id, product_name, unit_price, quantity, subtotal)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [ticketId, item.product_id, item.product_name, item.unit_price, item.quantity, itemSubtotal]
      );
    }

    // 8. Update session status to 'closed' and set closed_at = NOW()
    await db.executePreparedQuery(
      `UPDATE sessions SET status = 'closed', closed_at = NOW() WHERE id = ?`,
      [session_id]
    );

    // 9. Return the ticket with its items
    return this.getTicketById(ticketId);
    } catch (err) {
      console.error('createTicket error:', err);
      if (err.statusCode) throw err;
      throw new Error('Error al crear ticket: ' + err.message);
    }
  }

  async getTickets(filters = {}) {
    let query = `
      SELECT t.*,
             tb.number AS table_number,
             e.name AS waiter_name
      FROM tickets t
      INNER JOIN sessions s ON t.session_id = s.id
      INNER JOIN tables tb ON s.table_id = tb.id
      INNER JOIN employees e ON t.waiter_id = e.id
    `;

    const params = [];

    if (filters.date) {
      query += ' WHERE DATE(t.created_at) = ?';
      params.push(filters.date);
    }

    query += ' ORDER BY t.created_at DESC';

    try {
      return await db.fetchRows(query, params);
    } catch (err) {
      throw new Error('Error al obtener tickets: ' + err.message);
    }
  }

  async getTicketById(id) {
    const ticketRows = await db.executePreparedQuery(
      `SELECT t.*,
              tb.number AS table_number,
              e.name AS waiter_name
       FROM tickets t
       INNER JOIN sessions s ON t.session_id = s.id
       INNER JOIN tables tb ON s.table_id = tb.id
       INNER JOIN employees e ON t.waiter_id = e.id
       WHERE t.id = ?`,
      [id]
    );

    if (!ticketRows || !ticketRows[0]) {
      const err = new Error('Ticket no encontrado');
      err.statusCode = 404;
      throw err;
    }

    const ticketItems = await db.fetchRows(
      'SELECT * FROM ticket_items WHERE ticket_id = ?',
      [id]
    );

    const ticket = ticketRows[0];
    ticket.items = ticketItems || [];

    return ticket;
  }

  async getTicketBySession(sessionId) {
    const ticketRows = await db.executePreparedQuery(
      `SELECT t.*,
              tb.number AS table_number,
              e.name AS waiter_name
       FROM tickets t
       INNER JOIN sessions s ON t.session_id = s.id
       INNER JOIN tables tb ON s.table_id = tb.id
       INNER JOIN employees e ON t.waiter_id = e.id
       WHERE t.session_id = ?`,
      [sessionId]
    );

    if (!ticketRows || !ticketRows[0]) {
      const err = new Error('No se encontró ticket para esta sesión');
      err.statusCode = 404;
      throw err;
    }

    const ticketItems = await db.fetchRows(
      'SELECT * FROM ticket_items WHERE ticket_id = ?',
      [ticketRows[0].id]
    );

    const ticket = ticketRows[0];
    ticket.items = ticketItems || [];

    return ticket;
  }
}

module.exports = MySQLTicketAdapter;
