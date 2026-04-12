const OrderItemRepository = require('../../Domain/orderItemRepository');
const OrderItem = require('../../Domain/orderItem');
const db = require('../../../../core/db');

class MySQLOrderItemAdapter extends OrderItemRepository {
  async getItemsByArea(areaId) {
    const query = `
      SELECT
        oi.id,
        oi.order_id,
        oi.product_id,
        oi.area_id,
        oi.product_name,
        oi.unit_price,
        oi.quantity,
        oi.notes,
        oi.status,
        oi.sent_to_area_at,
        oi.ready_at,
        oi.delivered_at,
        t.number AS table_number,
        e.name AS waiter_name
      FROM order_items oi
      JOIN orders o ON o.id = oi.order_id
      JOIN sessions s ON s.id = o.session_id
      JOIN tables t ON t.id = s.table_id
      JOIN employees e ON e.id = o.waiter_id
      WHERE oi.area_id = ? AND oi.status IN ('pending', 'preparing')
      ORDER BY oi.sent_to_area_at ASC
    `;
    try {
      const rows = await db.fetchRows(query, [areaId]);
      return rows.map((row) => ({
        ...new OrderItem(row),
        table_number: row.table_number,
        waiter_name: row.waiter_name,
      }));
    } catch (err) {
      throw new Error('Error al obtener items por área: ' + err.message);
    }
  }

  async getItemsByOrder(orderId) {
    const query = 'SELECT * FROM order_items WHERE order_id = ? ORDER BY id ASC';
    try {
      const rows = await db.fetchRows(query, [orderId]);
      return rows.map((row) => new OrderItem(row));
    } catch (err) {
      throw new Error('Error al obtener items por orden: ' + err.message);
    }
  }

  async getItemById(id) {
    const query = 'SELECT * FROM order_items WHERE id = ?';
    try {
      const rows = await db.executePreparedQuery(query, [id]);
      if (!rows || !rows[0]) return null;
      return new OrderItem(rows[0]);
    } catch (err) {
      throw new Error('Error al obtener item: ' + err.message);
    }
  }

  async updateItemStatus(id, status) {
    try {
      let timestampField = '';
      if (status === 'ready') {
        timestampField = ', ready_at = NOW()';
      } else if (status === 'delivered') {
        timestampField = ', delivered_at = NOW()';
      }

      await db.executePreparedQuery(
        `UPDATE order_items SET status = ?${timestampField} WHERE id = ?`,
        [status, id]
      );

      return await this.getItemById(id);
    } catch (err) {
      throw new Error('Error al actualizar status del item: ' + err.message);
    }
  }
}

module.exports = MySQLOrderItemAdapter;
