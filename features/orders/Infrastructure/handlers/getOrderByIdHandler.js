class GetOrderByIdHandler {
  constructor(getOrderByIdUseCase) {
    this.getOrderByIdUseCase = getOrderByIdUseCase;
  }

  async handle(req, res) {
    try {
      const { id } = req.params;
      const order = await this.getOrderByIdUseCase.execute(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  }
}

module.exports = GetOrderByIdHandler;
