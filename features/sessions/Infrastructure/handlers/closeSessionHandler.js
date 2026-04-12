class CloseSessionHandler {
  constructor(closeSessionUseCase) {
    this.closeSessionUseCase = closeSessionUseCase;
  }

  async handle(req, res) {
    try {
      const { id } = req.params;
      const session = await this.closeSessionUseCase.execute(id);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  }
}

module.exports = CloseSessionHandler;
