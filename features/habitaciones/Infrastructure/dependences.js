const MySQLHabitacionRepository = require('./Repository/mysql');

// UseCases
const CreateHabitacionUseCase = require('../Application/habitacionUseCases/createHabitacionUseCase');
const GetHabitacionesUseCase = require('../Application/habitacionUseCases/getHabitacionesUseCase');
const GetHabitacionesByActivoUseCase = require('../Application/habitacionUseCases/getHabitacionesByActivoUseCase');
const GetHabitacionByIdUseCase = require('../Application/habitacionUseCases/getHabitacionByIdUseCase');
const GetHabitacionesByPisoUseCase = require('../Application/habitacionUseCases/getHabitacionesByPisoUseCase');
const GetHabitacionesByTipoUseCase = require('../Application/habitacionUseCases/getHabitacionesByTipoUseCase');
const UpdateHabitacionUseCase = require('../Application/habitacionUseCases/updateHabitacionUseCase');
const DeleteHabitacionUseCase = require('../Application/habitacionUseCases/deleteHabitacionUseCase');
const GetHabitacionByNumeroUseCase = require('../Application/habitacionUseCases/getHabitacionByNumeroUseCase');

// Routes and Controller
const habitacionRoutes = require('./Routes/habitacionRoutes');
const HabitacionController = require('./habitacionController');

// Handlers
const CreateHabitacionHandler = require('./handlers/createHabitacionHandler');
const GetHabitacionesHandler = require('./handlers/getHabitacionesHandler');
const DeleteHabitacionHandler = require('./handlers/deleteHabitacionHandler');
const GetHabitacionByIdHandler = require('./handlers/getHabitacionByIdHandler');
const UpdateHabitacionHandler = require('./handlers/updateHabitacionHandler');
const GetHabitacionesByPisoHandler = require('./handlers/getHabitacionesByPisoHandler');
const GetHabitacionesByTipoHandler = require('./handlers/getHabitacionesByTipoHandler');
const GetHabitacionesByActivoHandler = require('./handlers/getHabitacionesByActivoHandler');
const GetHabitacionByNumeroHandler = require('./handlers/getHabitacionByNumeroHandler');

function init_habitaciones(app) {
    let repository;
    const useInMemory = process.env.USE_IN_MEMORY === 'true' || process.env.NODE_ENV === 'test';
    if (useInMemory) {
        const InMemory = require('./Repository/inMemory');
        repository = new InMemory();
        console.log('Using InMemory habitacion repository');
    } else {
        repository = new MySQLHabitacionRepository();
    }

    // use cases
    const createHabitacionUseCase = new CreateHabitacionUseCase(repository);
    const getHabitacionesUseCase = new GetHabitacionesUseCase(repository);
    const getHabitacionesByActivoUseCase = new GetHabitacionesByActivoUseCase(repository);
    const getHabitacionByIdUseCase = new GetHabitacionByIdUseCase({ habitacionRepository: repository });
    const getHabitacionesByPisoUseCase = new GetHabitacionesByPisoUseCase({ habitacionRepository: repository });
    const getHabitacionesByTipoUseCase = new GetHabitacionesByTipoUseCase({ habitacionRepository: repository });
    const updateHabitacionUseCase = new UpdateHabitacionUseCase({ habitacionRepository: repository });
    const deleteHabitacionUseCase = new DeleteHabitacionUseCase({ habitacionRepository: repository });
    const getHabitacionByNumeroUseCase = new GetHabitacionByNumeroUseCase({ habitacionRepository: repository });

    // handlers
    const createHabitacionHandler = new CreateHabitacionHandler(createHabitacionUseCase);
    const getHabitacionesHandler = new GetHabitacionesHandler(getHabitacionesUseCase);
    const getHabitacionesByActivoHandler = new GetHabitacionesByActivoHandler(getHabitacionesByActivoUseCase);
    const getHabitacionByIdHandler = new GetHabitacionByIdHandler(getHabitacionByIdUseCase);
    const getHabitacionesByPisoHandler = new GetHabitacionesByPisoHandler(getHabitacionesByPisoUseCase);
    const getHabitacionesByTipoHandler = new GetHabitacionesByTipoHandler(getHabitacionesByTipoUseCase);
    const updateHabitacionHandler = new UpdateHabitacionHandler(updateHabitacionUseCase);
    const deleteHabitacionHandler = new DeleteHabitacionHandler(deleteHabitacionUseCase);
    const getHabitacionByNumeroHandler = new GetHabitacionByNumeroHandler(getHabitacionByNumeroUseCase);

    // controller
    const habitacionController = new HabitacionController(
        createHabitacionHandler,
        getHabitacionesHandler,
        deleteHabitacionHandler,
        getHabitacionByIdHandler,
        updateHabitacionHandler,
        getHabitacionesByPisoHandler,
        getHabitacionesByTipoHandler,
        getHabitacionesByActivoHandler,
        getHabitacionByNumeroHandler
    );

    const routes = habitacionRoutes(habitacionController);
    app.use('/habitaciones', routes);
}

module.exports = { init_habitaciones };
