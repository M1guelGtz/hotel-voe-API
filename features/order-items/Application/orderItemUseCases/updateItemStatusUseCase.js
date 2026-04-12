const VALID_TRANSITIONS = {
  pending: ['preparing', 'cancelled'],
  preparing: ['ready', 'cancelled'],
  ready: ['delivered', 'cancelled'],
  delivered: ['cancelled'],
  cancelled: [],
};

class UpdateItemStatusUseCase {
  constructor(orderItemRepository) {
    this.orderItemRepository = orderItemRepository;
  }

  async execute(id, status) {
    const item = await this.orderItemRepository.getItemById(id);

    if (!item) {
      const err = new Error('Order item not found');
      err.statusCode = 404;
      throw err;
    }

    const allowed = VALID_TRANSITIONS[item.status];
    if (!allowed || !allowed.includes(status)) {
      const err = new Error(
        `Invalid status transition from '${item.status}' to '${status}'`
      );
      err.statusCode = 400;
      throw err;
    }

    return await this.orderItemRepository.updateItemStatus(id, status);
  }
}

module.exports = UpdateItemStatusUseCase;
