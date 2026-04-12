const db = require('../../../../core/db');
const OrderRepository = require('../../Domain/orderRepository');

class MySQLOrderAdapter extends OrderRepository {
  constructor() {
    super();
    this.pool = db.pool;
  }

  async sessionExists(sessionId) {
    const query = `SELECT id, status FROM sessions WHERE id = ? AND status = 'open'`;
    try {
      const rows = await db.executePreparedQuery(query, [sessionId]);
      return rows && rows[0] ? rows[0] : null;
    } catch (err) {
      throw new Error('Error checking session: ' + err.message);
    }
  }

  async getProduct(productId) {
    const query = `SELECT id, name, price, area_id FROM products WHERE id = ?`;
    try {
      const rows = await db.executePreparedQuery(query, [productId]);
      return rows && rows[0] ? rows[0] : null;
    } catch (err) {
      throw new Error('Error fetching product: ' + err.message);
    }
  }

  async create(orderData, items) {
    try {
      // 1. Insert the order with status 'pending'
      const insertOrderQuery = `
        INSERT INTO orders (session_id, waiter_id, status)
        VALUES (?, ?, 'pending')
      `;
      const orderResult = await db.executePreparedQuery(insertOrderQuery, [
        orderData.session_id,
        orderData.waiter_id,
      ]);

      const orderId = orderResult.insertId;

      // 2. Insert all order_items with status='pending' and sent_to_area_at=NOW()
      for (const item of items) {
        const insertItemQuery = `
          INSERT INTO order_items (order_id, product_id, area_id, product_name, unit_price, quantity, notes, status, sent_to_area_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
        `;
        await db.executePreparedQuery(insertItemQuery, [
          orderId,
          item.product_id,
          item.area_id,
          item.product_name,
          item.unit_price,
          item.quantity,
          item.notes,
        ]);
      }

      // 3. Update order status to 'in_progress'
      const updateStatusQuery = `UPDATE orders SET status = 'in_progress' WHERE id = ?`;
      await db.executePreparedQuery(updateStatusQuery, [orderId]);

      // 4. Return the order with its items
      return this.findById(orderId);
    } catch (err) {
      throw new Error('Error creating order: ' + err.message);
    }
  }

  async findAll(filters = {}) {
    try {
      let query = `
        SELECT
          o.id,
          o.session_id,
          o.waiter_id,
          o.created_at,
          o.status,
          s.table_id
        FROM orders o
        JOIN sessions s ON s.id = o.session_id
      `;
      const params = [];

      if (filters.session_id) {
        query += ` WHERE o.session_id = ?`;
        params.push(filters.session_id);
      }

      query += ` ORDER BY o.created_at DESC`;

      const orders = await db.executePreparedQuery(query, params);
      return orders || [];
    } catch (err) {
      throw new Error('Error fetching orders: ' + err.message);
    }
  }

  async findById(id) {
    try {
      const orderQuery = `
        SELECT
          o.id,
          o.session_id,
          o.waiter_id,
          o.created_at,
          o.status,
          s.table_id
        FROM orders o
        JOIN sessions s ON s.id = o.session_id
        WHERE o.id = ?
      `;
      const orderRows = await db.executePreparedQuery(orderQuery, [id]);
      if (!orderRows || !orderRows[0]) return null;

      const order = orderRows[0];

      const itemsQuery = `
        SELECT
          id,
          order_id,
          product_id,
          area_id,
          product_name,
          unit_price,
          quantity,
          notes,
          status,
          sent_to_area_at,
          ready_at,
          delivered_at
        FROM order_items
        WHERE order_id = ?
        ORDER BY id ASC
      `;
      const items = await db.executePreparedQuery(itemsQuery, [id]);

      order.items = items || [];
      return order;
    } catch (err) {
      throw new Error('Error fetching order by ID: ' + err.message);
    }
  }

  async findBySessionId(sessionId) {
    try {
      const ordersQuery = `
        SELECT
          o.id,
          o.session_id,
          o.waiter_id,
          o.created_at,
          o.status,
          s.table_id
        FROM orders o
        JOIN sessions s ON s.id = o.session_id
        WHERE o.session_id = ?
        ORDER BY o.created_at DESC
      `;
      const orders = await db.executePreparedQuery(ordersQuery, [sessionId]);
      if (!orders || orders.length === 0) return [];

      // Fetch items for each order
      for (const order of orders) {
        const itemsQuery = `
          SELECT
            id,
            order_id,
            product_id,
            area_id,
            product_name,
            unit_price,
            quantity,
            notes,
            status,
            sent_to_area_at,
            ready_at,
            delivered_at
          FROM order_items
          WHERE order_id = ?
          ORDER BY id ASC
        `;
        const items = await db.executePreparedQuery(itemsQuery, [order.id]);
        order.items = items || [];
      }

      return orders;
    } catch (err) {
      throw new Error('Error fetching orders by session: ' + err.message);
    }
  }
}

module.exports = MySQLOrderAdapter;
