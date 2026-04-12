class GetOrdersBySessionHandler {
  constructor(getOrdersBySessionUseCase) {
    this.getOrdersBySessionUseCase = getOrdersBySessionUseCase;
  }

  async handle(req, res) {
    try {
      const { sessionId } = req.params;
      const orders = await this.getOrdersBySessionUseCase.execute(sessionId);
      res.status(200).json(orders);
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  }
}

module.exports = GetOrdersBySessionHandler;
