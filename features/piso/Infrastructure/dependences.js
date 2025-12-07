const MySQLPisoAdapter = require('./Repository/mysql');
// UseCases
const CreatePisoUseCase = require('../Application/pisoUseCases/createPisoUseCase');
const GetPisosUseCase = require('../Application/pisoUseCases/getPisosUseCase');
const GetPisosByActivoUseCase = require('../Application/pisoUseCases/getPisosByActivoUseCase');
const GetPisoByIdUseCase = require('../Application/pisoUseCases/getPisoByIdUseCase');
const GetPisosByHotelIdUseCase = require('../Application/pisoUseCases/getPisosByHotelIdUseCase');
const GetPisoByNumeroUseCase = require('../Application/pisoUseCases/getPisoByNumeroUseCase');
const GetPisoByNombreUseCase = require('../Application/pisoUseCases/getPisoByNombreUseCase');
const DeletePisoUseCase = require('../Application/pisoUseCases/deletePisoUseCase');
const PutPisoUseCase = require('../Application/pisoUseCases/putPisoUseCase');
// Handlers
const CreatePisoHandler = require('./handlers/createPisoHandler');
const GetPisosHandler = require('./handlers/getPisosHandler');
const DeletePisoHandler = require('./handlers/deletePisoHandler');
const GetPisoByIdHandler = require('./handlers/getPisoByIdHandler');
const PutPisoHandler = require('./handlers/putPisoHandler');
const GetPisosByHotelIdHandler = require('./handlers/getPisosByHotelIdHandler');
const GetPisoByNumeroHandler = require('./handlers/getPisoByNumeroHandler');
const GetPisoByNombreHandler = require('./handlers/getPisoByNombreHandler');
const GetPisosByActivoHandler = require('./handlers/getPisosByActivoHandler');
const PisoController = require('./pisoController');

function init_pisos(app) {
    let repository = new MySQLPisoAdapter();
    // UseCases
    const createPisoUseCase = new CreatePisoUseCase(repository);
    const getPisosUseCase = new GetPisosUseCase(repository);
    const getPisosByActivoUseCase = new GetPisosByActivoUseCase(repository);
    const getPisoByIdUseCase = new GetPisoByIdUseCase({ pisoRepository: repository });
    const getPisosByHotelIdUseCase = new GetPisosByHotelIdUseCase({ pisoRepository: repository });
    const getPisoByNumeroUseCase = new GetPisoByNumeroUseCase({ pisoRepository: repository });
    const getPisoByNombreUseCase = new GetPisoByNombreUseCase({ pisoRepository: repository });
    const deletePisoUseCase = new DeletePisoUseCase({ pisoRepository: repository });
    const putPisoUseCase = new PutPisoUseCase({ pisoRepository: repository });
    // Handlers
    const createPisoHandler = new CreatePisoHandler(createPisoUseCase);
    const getPisosHandler = new GetPisosHandler(getPisosUseCase);
    const deletePisoHandler = new DeletePisoHandler(deletePisoUseCase);
    const getPisoByIdHandler = new GetPisoByIdHandler(getPisoByIdUseCase);
    const putPisoHandler = new PutPisoHandler(putPisoUseCase);
    const getPisosByHotelIdHandler = new GetPisosByHotelIdHandler(getPisosByHotelIdUseCase);
    const getPisoByNumeroHandler = new GetPisoByNumeroHandler(getPisoByNumeroUseCase);
    const getPisoByNombreHandler = new GetPisoByNombreHandler(getPisoByNombreUseCase);
    const getPisosByActivoHandler = new GetPisosByActivoHandler(getPisosByActivoUseCase);
    // Controller
    const pisoController = new PisoController(
        createPisoHandler,
        getPisosHandler,
        deletePisoHandler,
        getPisoByIdHandler,
        putPisoHandler,
        getPisosByHotelIdHandler,
        getPisoByNumeroHandler,
        getPisoByNombreHandler,
        getPisosByActivoHandler
    );
    return { pisoController };
}

module.exports = { init_pisos };
