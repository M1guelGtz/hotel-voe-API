const fcmService = require('../../../../core/firebase/fcmService');

class CreateOrderHandler {
  constructor(createOrderUseCase) {
    this.createOrderUseCase = createOrderUseCase;
  }

  async handle(req, res) {
    try {
      const { session_id, items } = req.body;
      const waiter_id = req.user.id;

      const order = await this.createOrderUseCase.execute({
        session_id,
        waiter_id,
        items,
      });

      res.status(201).json(order);

      // Send push notifications to kitchen/bar (non-blocking)
      fcmService.notifyNewOrder(order).catch(err =>
        console.error('FCM notifyNewOrder error:', err.message)
      );
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  }
}

module.exports = CreateOrderHandler;
