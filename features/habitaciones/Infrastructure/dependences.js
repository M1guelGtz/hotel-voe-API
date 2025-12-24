const MySQLHabitacionAdapter = require('./Repository/mysql');
// UseCases
const CreateHabitacionUseCase = require('../Application/habitacionUseCases/createHabitacionUseCase');
const GetHabitacionesUseCase = require('../Application/habitacionUseCases/getHabitacionesUseCase');
const GetHabitacionesByActivoUseCase = require('../Application/habitacionUseCases/getHabitacionesByActivoUseCase');
const GetHabitacionByIdUseCase = require('../Application/habitacionUseCases/getHabitacionByIdUseCase');
const GetHabitacionesByPisoIdUseCase = require('../Application/habitacionUseCases/getHabitacionesByPisoIdUseCase');
const GetHabitacionByNumeroUseCase = require('../Application/habitacionUseCases/getHabitacionByNumeroUseCase');
const GetHabitacionByTipoUseCase = require('../Application/habitacionUseCases/getHabitacionByTipoUseCase');
const GetHabitacionByCapacidadUseCase = require('../Application/habitacionUseCases/getHabitacionByCapacidadUseCase');
const GetHabitacionByPrecioNocheUseCase = require('../Application/habitacionUseCases/getHabitacionByPrecioNocheUseCase');
const DeleteHabitacionUseCase = require('../Application/habitacionUseCases/deleteHabitacionUseCase');
const PutHabitacionUseCase = require('../Application/habitacionUseCases/putHabitacionUseCase');
// Handlers
const CreateHabitacionHandler = require('./handlers/createHabitacionHandler');
const GetHabitacionesHandler = require('./handlers/getHabitacionesHandler');
const DeleteHabitacionHandler = require('./handlers/deleteHabitacionHandler');
const GetHabitacionByIdHandler = require('./handlers/getHabitacionByIdHandler');
const PutHabitacionHandler = require('./handlers/putHabitacionHandler');
const GetHabitacionesByPisoIdHandler = require('./handlers/getHabitacionesByPisoIdHandler');
const GetHabitacionByNumeroHandler = require('./handlers/getHabitacionByNumeroHandler');
const GetHabitacionByTipoHandler = require('./handlers/getHabitacionByTipoHandler');
const GetHabitacionByCapacidadHandler = require('./handlers/getHabitacionByCapacidadHandler');
const GetHabitacionByPrecioNocheHandler = require('./handlers/getHabitacionByPrecioNocheHandler');
const GetHabitacionesByActivoHandler = require('./handlers/getHabitacionesByActivoHandler');
const HabitacionController = require('./habitacionController');
const habitacionRoutes = require('./Routes/habitacionRoutes');

function init_habitaciones(app) {
    let repository = new MySQLHabitacionAdapter();
    // UseCases
    const createHabitacionUseCase = new CreateHabitacionUseCase(repository);
    const getHabitacionesUseCase = new GetHabitacionesUseCase(repository);
    const getHabitacionesByActivoUseCase = new GetHabitacionesByActivoUseCase(repository);
    const getHabitacionByIdUseCase = new GetHabitacionByIdUseCase({ habitacionRepository: repository });
    const getHabitacionesByPisoIdUseCase = new GetHabitacionesByPisoIdUseCase({ habitacionRepository: repository });
    const getHabitacionByNumeroUseCase = new GetHabitacionByNumeroUseCase({ habitacionRepository: repository });
    const getHabitacionByTipoUseCase = new GetHabitacionByTipoUseCase({ habitacionRepository: repository });
    const getHabitacionByCapacidadUseCase = new GetHabitacionByCapacidadUseCase({ habitacionRepository: repository });
    const getHabitacionByPrecioNocheUseCase = new GetHabitacionByPrecioNocheUseCase({ habitacionRepository: repository });
    const deleteHabitacionUseCase = new DeleteHabitacionUseCase({ habitacionRepository: repository });
    const putHabitacionUseCase = new PutHabitacionUseCase({ habitacionRepository: repository });
    // Handlers
    const createHabitacionHandler = new CreateHabitacionHandler(createHabitacionUseCase);
    const getHabitacionesHandler = new GetHabitacionesHandler(getHabitacionesUseCase);
    const deleteHabitacionHandler = new DeleteHabitacionHandler(deleteHabitacionUseCase);
    const getHabitacionByIdHandler = new GetHabitacionByIdHandler(getHabitacionByIdUseCase);
    const putHabitacionHandler = new PutHabitacionHandler(putHabitacionUseCase);
    const getHabitacionesByPisoIdHandler = new GetHabitacionesByPisoIdHandler(getHabitacionesByPisoIdUseCase);
    const getHabitacionByNumeroHandler = new GetHabitacionByNumeroHandler(getHabitacionByNumeroUseCase);
    const getHabitacionByTipoHandler = new GetHabitacionByTipoHandler(getHabitacionByTipoUseCase);
    const getHabitacionByCapacidadHandler = new GetHabitacionByCapacidadHandler(getHabitacionByCapacidadUseCase);
    const getHabitacionByPrecioNocheHandler = new GetHabitacionByPrecioNocheHandler(getHabitacionByPrecioNocheUseCase);
    const getHabitacionesByActivoHandler = new GetHabitacionesByActivoHandler(getHabitacionesByActivoUseCase);
    // Controller
    const habitacionController = new HabitacionController(
        createHabitacionHandler,
        getHabitacionesHandler,
        deleteHabitacionHandler,
        getHabitacionByIdHandler,
        putHabitacionHandler,
        getHabitacionesByPisoIdHandler,
        getHabitacionByNumeroHandler,
        getHabitacionByTipoHandler,
        getHabitacionByCapacidadHandler,
        getHabitacionByPrecioNocheHandler,
        getHabitacionesByActivoHandler
    );

	const routes = habitacionRoutes(habitacionController);
	app.use('/habitaciones', routes);
}

module.exports = { init_habitaciones };