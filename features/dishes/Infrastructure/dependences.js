const MySQLDishAdapter = require('./repository/mysql');

// UseCases
const CreateDishUseCase = require('../Application/dishUseCases/createDishUseCase');
const GetDishesUseCase = require('../Application/dishUseCases/getDishesUseCase');
const GetDishByIdUseCase = require('../Application/dishUseCases/getDishByIdUseCase');
const PutDishUseCase = require('../Application/dishUseCases/putDishUseCase');
const DeleteDishUseCase = require('../Application/dishUseCases/deleteDishUseCase');

// Routes and Controller
const dishesRoutes = require('./routes/dishesRoutes');
const DishesController = require('./dishesController');

// Handlers
const CreateDishHandler = require('./handlers/createDishe');
const GetDishesHandler = require('./handlers/getDishesHandler');
const GetDishByIdHandler = require('./handlers/getDishByIdHandler');
const PutDishHandler = require('./handlers/putDishHandler');
const DeleteDishHandler = require('./handlers/deleteDishHandler');

function init_dishes(app) {
	let repository;
	const useInMemory = process.env.USE_IN_MEMORY === 'true' || process.env.NODE_ENV === 'test';
	if (useInMemory) {
		const InMemory = require('./repository/inMemory');
		repository = new InMemory();
		console.log('Using InMemory dish repository');
	} else {
		repository = new MySQLDishAdapter();
	}

	// use cases
	const createDishUseCase = new CreateDishUseCase(repository);
	const getDishesUseCase = new GetDishesUseCase(repository);
	const getDishByIdUseCase = new GetDishByIdUseCase({ dishRepository: repository });
	const putDishUseCase = new PutDishUseCase({ dishRepository: repository });
	const deleteDishUseCase = new DeleteDishUseCase({ dishRepository: repository });

	// handlers
	const createDishHandler = new CreateDishHandler(createDishUseCase);
	const getDishesHandler = new GetDishesHandler(getDishesUseCase);
	const getDishByIdHandler = new GetDishByIdHandler(getDishByIdUseCase);
	const putDishHandler = new PutDishHandler(putDishUseCase);
	const deleteDishHandler = new DeleteDishHandler(deleteDishUseCase);

	// controller
	const dishesController = new DishesController(
		createDishHandler,
		getDishesHandler,
		getDishByIdHandler,
		putDishHandler,
		deleteDishHandler
	);

	const routes = dishesRoutes(dishesController);
	app.use('/dishes', routes);
}

module.exports = { init_dishes };
