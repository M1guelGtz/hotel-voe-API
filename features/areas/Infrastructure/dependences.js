const MySQLAreaAdapter = require('./repository/mysql');

const CreateAreaUseCase = require('../Application/areaUseCases/createAreaUseCase');
const GetAreasUseCase = require('../Application/areaUseCases/getAreasUseCase');
const GetAreaByIdUseCase = require('../Application/areaUseCases/getAreaByIdUseCase');
const PutAreaUseCase = require('../Application/areaUseCases/putAreaUseCase');
const DeleteAreaUseCase = require('../Application/areaUseCases/deleteAreaUseCase');

const areasRoutes = require('./routes/areasRoutes');
const AreasController = require('./areasController');

const CreateAreaHandler = require('./handlers/createAreaHandler');
const GetAreasHandler = require('./handlers/getAreasHandler');
const GetAreaByIdHandler = require('./handlers/getAreaByIdHandler');
const PutAreaHandler = require('./handlers/putAreaHandler');
const DeleteAreaHandler = require('./handlers/deleteAreaHandler');

function init_areas(app) {
	let repository;
	const useInMemory = process.env.USE_IN_MEMORY === 'true' || process.env.NODE_ENV === 'test';
	if (useInMemory) {
		const InMemory = require('./repository/inMemory');
		repository = new InMemory();
		console.log('Using InMemory area repository');
	} else {
		repository = new MySQLAreaAdapter();
	}

	const createAreaUseCase = new CreateAreaUseCase(repository);
	const getAreasUseCase = new GetAreasUseCase(repository);
	const getAreaByIdUseCase = new GetAreaByIdUseCase({ areaRepository: repository });
	const putAreaUseCase = new PutAreaUseCase({ areaRepository: repository });
	const deleteAreaUseCase = new DeleteAreaUseCase({ areaRepository: repository });

	const createAreaHandler = new CreateAreaHandler(createAreaUseCase);
	const getAreasHandler = new GetAreasHandler(getAreasUseCase);
	const getAreaByIdHandler = new GetAreaByIdHandler(getAreaByIdUseCase);
	const putAreaHandler = new PutAreaHandler(putAreaUseCase);
	const deleteAreaHandler = new DeleteAreaHandler(deleteAreaUseCase);

	const areasController = new AreasController(
		createAreaHandler,
		getAreasHandler,
		getAreaByIdHandler,
		putAreaHandler,
		deleteAreaHandler
	);

	const routes = areasRoutes(areasController);
	app.use('/areas', routes);
}

module.exports = { init_areas };
