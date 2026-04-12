class CreateSessionHandler {
  constructor(createSessionUseCase) {
    this.createSessionUseCase = createSessionUseCase;
  }

  async handle(req, res) {
    try {
      const { table_id } = req.body;
      const waiter_id = req.user.id;

      const session = await this.createSessionUseCase.execute({ table_id, waiter_id });
      res.status(201).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  }
}

module.exports = CreateSessionHandler;
