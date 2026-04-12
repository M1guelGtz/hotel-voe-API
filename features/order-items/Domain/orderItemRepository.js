class OrderItemRepository {
  async getItemsByArea(areaId) {
    throw new Error('Method getItemsByArea must be implemented');
  }

  async getItemsByOrder(orderId) {
    throw new Error('Method getItemsByOrder must be implemented');
  }

  async getItemById(id) {
    throw new Error('Method getItemById must be implemented');
  }

  async updateItemStatus(id, status) {
    throw new Error('Method updateItemStatus must be implemented');
  }
}

module.exports = OrderItemRepository;
