const express = require('express');
const authMiddleware = require('../../../../core/middleware/authMiddleware');

module.exports = function ordersRoutes(controller) {
  const router = express.Router();

  router.use(authMiddleware);
  router.post('/', (req, res) => controller.createOrder(req, res));
  router.get('/', (req, res) => controller.getOrders(req, res));
  router.get('/session/:sessionId', (req, res) => controller.getOrdersBySession(req, res));
  router.get('/:id', (req, res) => controller.getOrderById(req, res));

  return router;
};
