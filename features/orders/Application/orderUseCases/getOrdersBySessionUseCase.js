class GetOrdersBySessionUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(sessionId) {
    if (!sessionId) {
      const err = new Error('Session id is required');
      err.statusCode = 400;
      throw err;
    }

    const orders = await this.orderRepository.findBySessionId(sessionId);
    return orders;
  }
}

module.exports = GetOrdersBySessionUseCase;
