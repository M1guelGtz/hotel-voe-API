class SessionRepository {
  async create(session) {
    throw new Error('Method create() must be implemented');
  }

  async findAll(filters) {
    throw new Error('Method findAll() must be implemented');
  }

  async findById(id) {
    throw new Error('Method findById() must be implemented');
  }

  async close(id) {
    throw new Error('Method close() must be implemented');
  }

  async findOpenByTableId(tableId) {
    throw new Error('Method findOpenByTableId() must be implemented');
  }

  async tableExists(tableId) {
    throw new Error('Method tableExists() must be implemented');
  }
}

module.exports = SessionRepository;
