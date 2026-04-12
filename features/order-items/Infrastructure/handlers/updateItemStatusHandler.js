class UpdateItemStatusHandler {
  constructor(updateItemStatusUseCase) {
    this.updateItemStatusUseCase = updateItemStatusUseCase;
  }

  async handle(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        const err = new Error('Status is required');
        err.statusCode = 400;
        throw err;
      }

      const result = await this.updateItemStatusUseCase.execute(id, status);
      res.status(200).json(result);
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  }
}

module.exports = UpdateItemStatusHandler;
