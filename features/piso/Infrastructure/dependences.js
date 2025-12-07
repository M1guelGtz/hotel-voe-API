const MySQLAdapter = require('./Repository/mysql');

// UseCases
const CreateHotelUseCase = require('../Application/hotelUseCases/createHotelUseCase');
const GetHotelsUseCase = require('../Application/hotelUseCases/getHotelsUseCase');
const GetHotelsByActivoUseCase = require('../Application/hotelUseCases/getHotelsByActivoUseCase');
const GetHotelByIdUseCase = require('../Application/hotelUseCases/getHotelByIdUseCase');
const GetHotelByNombreUseCase = require('../Application/hotelUseCases/getHotelByNombreUseCase');
const GetHotelByDireccionUseCase = require('../Application/hotelUseCases/getHotelByDireccionUseCase');
const GetHotelByEmailUseCase = require('../Application/hotelUseCases/getHotelByEmailUseCase');
const GetHotelByTelefonoUseCase = require('../Application/hotelUseCases/getHotelByTelefonoUseCase');
const DeleteHotelUseCase = require('../Application/hotelUseCases/deleteHotelUseCase');
const PutHotelUseCase = require('../Application/hotelUseCases/putHotelUseCase');

// Routes and Controller
const hotelRoutes = require('./Routes/hotelRoutes');
const HotelController = require('./hotelController');

// Handlers
const CreateHotelHandler = require('./handlers/createHotelHandler');
const GetHotelsHandler = require('./handlers/getHotelsHandler');
const DeleteHotelHandler = require('./handlers/deleteHotelHandler');
const GetHotelByIdHandler = require('./handlers/getHotelByIdHandler');
const PutHotelHandler = require('./handlers/putHotelHandler');
const GetHotelByNombreHandler = require('./handlers/getHotelByNombreHandler');
const GetHotelByDireccionHandler = require('./handlers/getHotelByDireccionHandler');
const GetHotelByEmailHandler = require('./handlers/getHotelByEmailHandler');
const GetHotelByTelefonoHandler = require('./handlers/getHotelByTelefonoHandler');
const GetHotelsByActivoHandler = require('./handlers/getHotelsByActivoHandler');


function init_hotels(app) {
	let repository;
	const useInMemory = process.env.USE_IN_MEMORY === 'true' || process.env.NODE_ENV === 'test';
	if (useInMemory) {
		const InMemory = require('./Infrastructure/Repository/inMemory');
		repository = new InMemory();
		console.log('Using InMemory hotel repository');
	} else {
		repository = new MySQLAdapter();
	}

	// use cases
	const createHotelUseCase = new CreateHotelUseCase(repository);
	const getHotelsUseCase = new GetHotelsUseCase(repository);
	const getHotelsByActivoUseCase = new GetHotelsByActivoUseCase(repository);
	const getHotelByIdUseCase = new GetHotelByIdUseCase({ hotelRepository: repository });
	const getHotelByNombreUseCase = new GetHotelByNombreUseCase({ hotelRepository: repository });
	const getHotelByDireccionUseCase = new GetHotelByDireccionUseCase({ hotelRepository: repository });
	const getHotelByEmailUseCase = new GetHotelByEmailUseCase({ hotelRepository: repository });
	const getHotelByTelefonoUseCase = new GetHotelByTelefonoUseCase({ hotelRepository: repository });
	const deleteHotelUseCase = new DeleteHotelUseCase({ hotelRepository: repository });
	const putHotelUseCase = new PutHotelUseCase({ hotelRepository: repository });

	// handlers
	const createHotelHandler = new CreateHotelHandler(createHotelUseCase);
	const getHotelsHandler = new GetHotelsHandler(getHotelsUseCase);
	const getHotelsByActivoHandler = new GetHotelsByActivoHandler(getHotelsByActivoUseCase);
	const getHotelByIdHandler = new GetHotelByIdHandler(getHotelByIdUseCase);
	const getHotelByNombreHandler = new GetHotelByNombreHandler(getHotelByNombreUseCase);
	const getHotelByDireccionHandler = new GetHotelByDireccionHandler(getHotelByDireccionUseCase);
	const getHotelByEmailHandler = new GetHotelByEmailHandler(getHotelByEmailUseCase);
	const getHotelByTelefonoHandler = new GetHotelByTelefonoHandler(getHotelByTelefonoUseCase);
	const deleteHotelHandler = new DeleteHotelHandler(deleteHotelUseCase);
	const putHotelHandler = new PutHotelHandler(putHotelUseCase);

	// controller
	const hotelController = new HotelController(
		createHotelHandler,
		getHotelsHandler,
		deleteHotelHandler,
		getHotelByIdHandler,
		putHotelHandler,
		getHotelByNombreHandler,
		getHotelByDireccionHandler,
		getHotelByEmailHandler,
		getHotelByTelefonoHandler,
		getHotelsByActivoHandler
	);

	const routes = hotelRoutes(hotelController);
	app.use('/hotels', routes);
}

module.exports = { init_hotels };

