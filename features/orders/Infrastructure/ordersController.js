class OrdersController {
  constructor(createHandler, getHandler, getByIdHandler, getBySessionHandler) {
    this.createHandler = createHandler;
    this.getHandler = getHandler;
    this.getByIdHandler = getByIdHandler;
    this.getBySessionHandler = getBySessionHandler;
  }

  createOrder(req, res) {
    return this.createHandler.handle(req, res);
  }

  getOrders(req, res) {
    return this.getHandler.handle(req, res);
  }

  getOrderById(req, res) {
    return this.getByIdHandler.handle(req, res);
  }

  getOrdersBySession(req, res) {
    return this.getBySessionHandler.handle(req, res);
  }
}

module.exports = OrdersController;
