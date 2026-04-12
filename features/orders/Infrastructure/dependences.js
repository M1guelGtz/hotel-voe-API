const MySQLOrderAdapter = require('./repository/mysql');

// UseCases
const CreateOrderUseCase = require('../Application/orderUseCases/createOrderUseCase');
const GetOrdersUseCase = require('../Application/orderUseCases/getOrdersUseCase');
const GetOrderByIdUseCase = require('../Application/orderUseCases/getOrderByIdUseCase');
const GetOrdersBySessionUseCase = require('../Application/orderUseCases/getOrdersBySessionUseCase');

// Routes and Controller
const ordersRoutes = require('./routes/ordersRoutes');
const OrdersController = require('./ordersController');

// Handlers
const CreateOrderHandler = require('./handlers/createOrderHandler');
const GetOrdersHandler = require('./handlers/getOrdersHandler');
const GetOrderByIdHandler = require('./handlers/getOrderByIdHandler');
const GetOrdersBySessionHandler = require('./handlers/getOrdersBySessionHandler');

function init_orders(app) {
  const repository = new MySQLOrderAdapter();

  // use cases
  const createOrderUseCase = new CreateOrderUseCase(repository);
  const getOrdersUseCase = new GetOrdersUseCase(repository);
  const getOrderByIdUseCase = new GetOrderByIdUseCase(repository);
  const getOrdersBySessionUseCase = new GetOrdersBySessionUseCase(repository);

  // handlers
  const createOrderHandler = new CreateOrderHandler(createOrderUseCase);
  const getOrdersHandler = new GetOrdersHandler(getOrdersUseCase);
  const getOrderByIdHandler = new GetOrderByIdHandler(getOrderByIdUseCase);
  const getOrdersBySessionHandler = new GetOrdersBySessionHandler(getOrdersBySessionUseCase);

  // controller
  const ordersController = new OrdersController(
    createOrderHandler,
    getOrdersHandler,
    getOrderByIdHandler,
    getOrdersBySessionHandler
  );

  const routes = ordersRoutes(ordersController);
  app.use('/orders', routes);
}

module.exports = { init_orders };
