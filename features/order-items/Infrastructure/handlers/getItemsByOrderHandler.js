class GetItemsByOrderHandler {
  constructor(getItemsByOrderUseCase) {
    this.getItemsByOrderUseCase = getItemsByOrderUseCase;
  }

  async handle(req, res) {
    try {
      const { orderId } = req.params;
      const items = await this.getItemsByOrderUseCase.execute(orderId);
      res.status(200).json(items);
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  }
}

module.exports = GetItemsByOrderHandler;
