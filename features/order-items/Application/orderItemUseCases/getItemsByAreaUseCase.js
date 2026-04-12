class GetItemsByAreaUseCase {
  constructor(orderItemRepository) {
    this.orderItemRepository = orderItemRepository;
  }

  async execute(areaId) {
    return await this.orderItemRepository.getItemsByArea(areaId);
  }
}

module.exports = GetItemsByAreaUseCase;
