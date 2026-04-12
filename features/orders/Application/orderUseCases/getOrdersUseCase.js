class GetOrdersUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(filters = {}) {
    return this.orderRepository.findAll(filters);
  }
}

module.exports = GetOrdersUseCase;
