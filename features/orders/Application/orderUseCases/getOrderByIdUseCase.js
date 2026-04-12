class GetOrderByIdUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(id) {
    if (!id) {
      const err = new Error('Order id is required');
      err.statusCode = 400;
      throw err;
    }

    const order = await this.orderRepository.findById(id);
    if (!order) {
      const err = new Error('Order not found');
      err.statusCode = 404;
      throw err;
    }

    return order;
  }
}

module.exports = GetOrderByIdUseCase;
