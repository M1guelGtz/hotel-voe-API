class OrderRepository {
  async create(orderData, items) {
    throw new Error('Method create() must be implemented');
  }

  async findAll(filters) {
    throw new Error('Method findAll() must be implemented');
  }

  async findById(id) {
    throw new Error('Method findById() must be implemented');
  }

  async findBySessionId(sessionId) {
    throw new Error('Method findBySessionId() must be implemented');
  }

  async sessionExists(sessionId) {
    throw new Error('Method sessionExists() must be implemented');
  }

  async getProduct(productId) {
    throw new Error('Method getProduct() must be implemented');
  }
}

module.exports = OrderRepository;
