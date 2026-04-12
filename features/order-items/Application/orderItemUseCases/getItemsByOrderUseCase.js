class GetItemsByOrderUseCase {
  constructor(orderItemRepository) {
    this.orderItemRepository = orderItemRepository;
  }

  async execute(orderId) {
    return await this.orderItemRepository.getItemsByOrder(orderId);
  }
}

module.exports = GetItemsByOrderUseCase;
