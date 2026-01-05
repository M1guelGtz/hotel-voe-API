const MySQLHuespedAdapter = require('./Repository/mysql');
// UseCases
const CreateHuespedUseCase = require('../Application/huespedUseCases/createHuespedUseCase');
const GetHuespedsUseCase = require('../Application/huespedUseCases/getHuespedsUseCase');
const GetHuespedByIdUseCase = require('../Application/huespedUseCases/getHuespedByIdUseCase');
const GetHuespedByPersonaIdUseCase = require('../Application/huespedUseCases/getHuespedByPersonaIdUseCase');
const GetHuespedByDocumentoIdentidadUseCase = require('../Application/huespedUseCases/getHuespedByDocumentoIdentidadUseCase');
const GetHuespedByTipoDocumentoUseCase = require('../Application/huespedUseCases/getHuespedByTipoDocumentoUseCase');
const GetHuespedByEmailUseCase = require('../Application/huespedUseCases/getHuespedByEmailUseCase');
const GetHuespedByTelefonoUseCase = require('../Application/huespedUseCases/getHuespedByTelefonoUseCase');
const DeleteHuespedUseCase = require('../Application/huespedUseCases/deleteHuespedUseCase');
const PutHuespedUseCase = require('../Application/huespedUseCases/putHuespedUseCase');
// Handlers
const CreateHuespedHandler = require('./handlers/createHuespedHandler');
const GetHuespedsHandler = require('./handlers/getHuespedsHandler');
const DeleteHuespedHandler = require('./handlers/deleteHuespedHandler');
const GetHuespedByIdHandler = require('./handlers/getHuespedByIdHandler');
const PutHuespedHandler = require('./handlers/putHuespedHandler');
const GetHuespedByPersonaIdHandler = require('./handlers/getHuespedByPersonaIdHandler');
const GetHuespedByDocumentoIdentidadHandler = require('./handlers/getHuespedByDocumentoIdentidadHandler');
const GetHuespedByTipoDocumentoHandler = require('./handlers/getHuespedByTipoDocumentoHandler');
const GetHuespedByEmailHandler = require('./handlers/getHuespedByEmailHandler');
const GetHuespedByTelefonoHandler = require('./handlers/getHuespedByTelefonoHandler');
const HuespedController = require('./huespedController');
const huespedRoutes = require('./Routes/huespedRoutes');

function init_huespeds(app) {
    let repository = new MySQLHuespedAdapter();
    // UseCases
    const createHuespedUseCase = new CreateHuespedUseCase(repository);
    const getHuespedsUseCase = new GetHuespedsUseCase(repository);
    const getHuespedByIdUseCase = new GetHuespedByIdUseCase({ huespedRepository: repository });
    const getHuespedByPersonaIdUseCase = new GetHuespedByPersonaIdUseCase({ huespedRepository: repository });
    const getHuespedByDocumentoIdentidadUseCase = new GetHuespedByDocumentoIdentidadUseCase({ huespedRepository: repository });
    const getHuespedByTipoDocumentoUseCase = new GetHuespedByTipoDocumentoUseCase({ huespedRepository: repository });
    const getHuespedByEmailUseCase = new GetHuespedByEmailUseCase({ huespedRepository: repository });
    const getHuespedByTelefonoUseCase = new GetHuespedByTelefonoUseCase({ huespedRepository: repository });
    const deleteHuespedUseCase = new DeleteHuespedUseCase({ huespedRepository: repository });
    const putHuespedUseCase = new PutHuespedUseCase({ huespedRepository: repository });
    // Handlers
    const createHuespedHandler = new CreateHuespedHandler(createHuespedUseCase);
    const getHuespedsHandler = new GetHuespedsHandler(getHuespedsUseCase);
    const deleteHuespedHandler = new DeleteHuespedHandler(deleteHuespedUseCase);
    const getHuespedByIdHandler = new GetHuespedByIdHandler(getHuespedByIdUseCase);
    const putHuespedHandler = new PutHuespedHandler(putHuespedUseCase);
    const getHuespedByPersonaIdHandler = new GetHuespedByPersonaIdHandler(getHuespedByPersonaIdUseCase);
    const getHuespedByDocumentoIdentidadHandler = new GetHuespedByDocumentoIdentidadHandler(getHuespedByDocumentoIdentidadUseCase);
    const getHuespedByTipoDocumentoHandler = new GetHuespedByTipoDocumentoHandler(getHuespedByTipoDocumentoUseCase);
    const getHuespedByEmailHandler = new GetHuespedByEmailHandler(getHuespedByEmailUseCase);
    const getHuespedByTelefonoHandler = new GetHuespedByTelefonoHandler(getHuespedByTelefonoUseCase);
    // Controller
    const huespedController = new HuespedController(
        createHuespedHandler,
        getHuespedsHandler,
        deleteHuespedHandler,
        getHuespedByIdHandler,
        putHuespedHandler,
        getHuespedByPersonaIdHandler,
        getHuespedByDocumentoIdentidadHandler,
        getHuespedByTipoDocumentoHandler,
        getHuespedByEmailHandler,
        getHuespedByTelefonoHandler
    );

	const routes = huespedRoutes(huespedController);
	app.use('/huespeds', routes);
}

module.exports = { init_huespeds };