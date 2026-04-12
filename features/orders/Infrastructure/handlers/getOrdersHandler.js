class GetOrdersHandler {
  constructor(getOrdersUseCase) {
    this.getOrdersUseCase = getOrdersUseCase;
  }

  async handle(req, res) {
    try {
      const filters = {};
      if (req.query.session_id) {
        filters.session_id = req.query.session_id;
      }

      const orders = await this.getOrdersUseCase.execute(filters);
      res.status(200).json(orders);
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  }
}

module.exports = GetOrdersHandler;
