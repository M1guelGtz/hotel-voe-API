class GetSessionsHandler {
  constructor(getSessionsUseCase) {
    this.getSessionsUseCase = getSessionsUseCase;
  }

  async handle(req, res) {
    try {
      const filters = {};
      if (req.query.status) {
        filters.status = req.query.status;
      }

      const sessions = await this.getSessionsUseCase.execute(filters);
      res.status(200).json(sessions);
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  }
}

module.exports = GetSessionsHandler;
