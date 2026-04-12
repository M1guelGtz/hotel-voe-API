class CreateSessionUseCase {
  constructor(sessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async execute({ table_id, waiter_id }) {
    if (!table_id) {
      const err = new Error('table_id is required');
      err.statusCode = 400;
      throw err;
    }

    if (!waiter_id) {
      const err = new Error('waiter_id is required');
      err.statusCode = 400;
      throw err;
    }

    const table = await this.sessionRepository.tableExists(table_id);
    if (!table) {
      const err = new Error('Table not found or is not active');
      err.statusCode = 404;
      throw err;
    }

    const openSession = await this.sessionRepository.findOpenByTableId(table_id);
    if (openSession) {
      const err = new Error('This table already has an open session');
      err.statusCode = 409;
      throw err;
    }

    const session = await this.sessionRepository.create({ table_id, waiter_id });
    return session;
  }
}

module.exports = CreateSessionUseCase;
