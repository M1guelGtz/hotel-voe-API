const admin = require('firebase-admin');
const db = require('../db');

// Initialize Firebase Admin SDK
// Place your service account JSON file at core/firebase/serviceAccountKey.json
const path = require('path');
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

let firebaseInitialized = false;

try {
  const serviceAccount = require(serviceAccountPath);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  firebaseInitialized = true;
  console.log('Firebase Admin SDK initialized');
} catch (err) {
  console.warn('Firebase Admin SDK NOT initialized:', err.message);
  console.warn('Push notifications will be disabled. Place serviceAccountKey.json in core/firebase/');
}

/**
 * Send push notification to a single FCM token
 */
async function sendToToken(token, title, body, data = {}) {
  if (!firebaseInitialized || !token) return null;

  try {
    const message = {
      token,
      notification: { title, body },
      data: Object.fromEntries(
        Object.entries(data).map(([k, v]) => [k, String(v)])
      ),
    };
    const response = await admin.messaging().send(message);
    return response;
  } catch (err) {
    // Token expired or invalid — clean it up
    if (err.code === 'messaging/registration-token-not-registered' ||
        err.code === 'messaging/invalid-registration-token') {
      console.warn('Invalid FCM token, clearing:', token.substring(0, 20) + '...');
    } else {
      console.error('FCM send error:', err.message);
    }
    return null;
  }
}

/**
 * Send push notification to multiple FCM tokens
 */
async function sendToTokens(tokens, title, body, data = {}) {
  if (!firebaseInitialized || !tokens || tokens.length === 0) return;

  const results = await Promise.allSettled(
    tokens.map(token => sendToToken(token, title, body, data))
  );
  return results;
}

/**
 * Save/update FCM token for a user
 */
async function saveFcmToken(userId, fcmToken) {
  await db.executePreparedQuery(
    'UPDATE employees SET fcm_token = ? WHERE id = ?',
    [fcmToken, userId]
  );
}

/**
 * Get FCM tokens for users by role name (e.g., 'cocina', 'barra')
 */
async function getTokensByRole(roleName) {
  const rows = await db.fetchRows(
    `SELECT e.fcm_token
     FROM employees e
     JOIN roles r ON r.id = e.role_id
     WHERE r.name = ? AND e.fcm_token IS NOT NULL AND e.is_active = 1`,
    [roleName]
  );
  return rows.map(r => r.fcm_token).filter(Boolean);
}

/**
 * Get FCM token for a specific user
 */
async function getTokenByUserId(userId) {
  const rows = await db.executePreparedQuery(
    'SELECT fcm_token FROM employees WHERE id = ? AND fcm_token IS NOT NULL',
    [userId]
  );
  return rows && rows[0] ? rows[0].fcm_token : null;
}

/**
 * Notify kitchen/bar areas when a new order is created
 */
async function notifyNewOrder(order) {
  if (!firebaseInitialized) return;

  try {
    // Group items by area to send targeted notifications
    const items = order.items || [];
    const areaIds = [...new Set(items.map(i => i.area_id))];

    for (const areaId of areaIds) {
      // Get area info and role
      const areaRows = await db.executePreparedQuery(
        `SELECT a.name AS area_name, r.name AS role_name
         FROM areas a
         JOIN roles r ON r.id = a.role_id
         WHERE a.id = ?`,
        [areaId]
      );

      if (!areaRows || !areaRows[0]) continue;

      const { area_name, role_name } = areaRows[0];
      const areaItems = items.filter(i => i.area_id === areaId);
      const itemNames = areaItems.map(i => `${i.quantity}x ${i.product_name}`).join(', ');

      // Get table number
      const sessionRows = await db.executePreparedQuery(
        `SELECT t.number AS table_number
         FROM sessions s
         JOIN tables t ON t.id = s.table_id
         WHERE s.id = ?`,
        [order.session_id]
      );
      const tableNumber = sessionRows && sessionRows[0] ? sessionRows[0].table_number : '?';

      const tokens = await getTokensByRole(role_name);
      if (tokens.length > 0) {
        await sendToTokens(
          tokens,
          `Nuevo Pedido - Mesa ${tableNumber}`,
          itemNames,
          {
            type: 'NEW_ORDER',
            order_id: String(order.id),
            area_id: String(areaId),
            table_number: String(tableNumber),
          }
        );
      }
    }
  } catch (err) {
    console.error('notifyNewOrder error:', err.message);
  }
}

/**
 * Notify waiter when an item status changes to 'ready'
 */
async function notifyItemReady(itemId) {
  if (!firebaseInitialized) return;

  try {
    const rows = await db.fetchRows(
      `SELECT
         oi.product_name,
         oi.quantity,
         o.waiter_id,
         t.number AS table_number
       FROM order_items oi
       JOIN orders o ON o.id = oi.order_id
       JOIN sessions s ON s.id = o.session_id
       JOIN tables t ON t.id = s.table_id
       WHERE oi.id = ?`,
      [itemId]
    );

    if (!rows || !rows[0]) return;

    const { product_name, quantity, waiter_id, table_number } = rows[0];
    const token = await getTokenByUserId(waiter_id);

    if (token) {
      await sendToToken(
        token,
        `Pedido Listo - Mesa ${table_number}`,
        `${quantity}x ${product_name} listo para entregar`,
        {
          type: 'ORDER_STATUS_UPDATE',
          item_id: String(itemId),
          status: 'ready',
          table_number: String(table_number),
        }
      );
    }
  } catch (err) {
    console.error('notifyItemReady error:', err.message);
  }
}

module.exports = {
  saveFcmToken,
  getTokensByRole,
  getTokenByUserId,
  sendToToken,
  sendToTokens,
  notifyNewOrder,
  notifyItemReady,
};
