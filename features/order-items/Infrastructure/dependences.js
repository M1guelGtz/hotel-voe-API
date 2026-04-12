const MySQLOrderItemAdapter = require('./repository/mysql');

const GetItemsByAreaUseCase = require('../Application/orderItemUseCases/getItemsByAreaUseCase');
const GetItemsByOrderUseCase = require('../Application/orderItemUseCases/getItemsByOrderUseCase');
const UpdateItemStatusUseCase = require('../Application/orderItemUseCases/updateItemStatusUseCase');

const GetItemsByAreaHandler = require('./handlers/getItemsByAreaHandler');
const GetItemsByOrderHandler = require('./handlers/getItemsByOrderHandler');
const UpdateItemStatusHandler = require('./handlers/updateItemStatusHandler');

const OrderItemsController = require('./orderItemsController');
const orderItemsRoutes = require('./routes/orderItemsRoutes');

function init_orderItems(app) {
  const orderItemRepository = new MySQLOrderItemAdapter();

  const getItemsByAreaUseCase = new GetItemsByAreaUseCase(orderItemRepository);
  const getItemsByOrderUseCase = new GetItemsByOrderUseCase(orderItemRepository);
  const updateItemStatusUseCase = new UpdateItemStatusUseCase(orderItemRepository);

  const getItemsByAreaHandler = new GetItemsByAreaHandler(getItemsByAreaUseCase);
  const getItemsByOrderHandler = new GetItemsByOrderHandler(getItemsByOrderUseCase);
  const updateItemStatusHandler = new UpdateItemStatusHandler(updateItemStatusUseCase);

  const controller = new OrderItemsController(
    getItemsByAreaHandler,
    getItemsByOrderHandler,
    updateItemStatusHandler
  );

  const router = orderItemsRoutes(controller);
  app.use('/order-items', router);
}

module.exports = { init_orderItems };
