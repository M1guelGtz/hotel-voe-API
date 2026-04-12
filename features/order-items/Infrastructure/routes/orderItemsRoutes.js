const { Router } = require('express');
const authMiddleware = require('../../../../core/middleware/authMiddleware');

function orderItemsRoutes(controller) {
  const router = Router();

  router.get('/area/:areaId', authMiddleware, (req, res) =>
    controller.getItemsByAreaHandler.handle(req, res)
  );

  router.get('/order/:orderId', authMiddleware, (req, res) =>
    controller.getItemsByOrderHandler.handle(req, res)
  );

  router.put('/:id/status', authMiddleware, (req, res) =>
    controller.updateItemStatusHandler.handle(req, res)
  );

  return router;
}

module.exports = orderItemsRoutes;
