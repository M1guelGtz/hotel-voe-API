class OrderItemsController {
  constructor(getItemsByAreaHandler, getItemsByOrderHandler, updateItemStatusHandler) {
    this.getItemsByAreaHandler = getItemsByAreaHandler;
    this.getItemsByOrderHandler = getItemsByOrderHandler;
    this.updateItemStatusHandler = updateItemStatusHandler;
  }
}

module.exports = OrderItemsController;
