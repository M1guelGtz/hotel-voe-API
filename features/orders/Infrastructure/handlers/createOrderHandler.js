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
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  }
}

module.exports = CreateOrderHandler;
