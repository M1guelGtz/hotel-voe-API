const MySQLPersonaAdapter = require('./Repository/mysql');
// UseCases
const CreatePersonaUseCase = require('../Application/personaUseCases/createPersonaUseCase');
const GetPersonasUseCase = require('../Application/personaUseCases/getPersonasUseCase');
const GetPersonaByIdUseCase = require('../Application/personaUseCases/getPersonaByIdUseCase');
const GetPersonaByNombreApellidoUseCase = require('../Application/personaUseCases/getPersonaByNombreApellidoUseCase');
const GetPersonaByApellidoMaternoUseCase = require('../Application/personaUseCases/getPersonaByApellidoMaternoUseCase');
const GetPersonaByFechaNacimientoUseCase = require('../Application/personaUseCases/getPersonaByFechaNacimientoUseCase');
const GetPersonaByTelefonoUseCase = require('../Application/personaUseCases/getPersonaByTelefonoUseCase');
const GetPersonaByDireccionUseCase = require('../Application/personaUseCases/getPersonaByDireccionUseCase');
const DeletePersonaUseCase = require('../Application/personaUseCases/deletePersonaUseCase');
const PutPersonaUseCase = require('../Application/personaUseCases/putPersonaUseCase');
// Handlers
const CreatePersonaHandler = require('./handlers/createPersonaHandler');
const GetPersonasHandler = require('./handlers/getPersonasHandler');
const DeletePersonaHandler = require('./handlers/deletePersonaHandler');
const GetPersonaByIdHandler = require('./handlers/getPersonaByIdHandler');
const PutPersonaHandler = require('./handlers/putPersonaHandler');
const GetPersonaByNombreApellidoHandler = require('./handlers/getPersonaByNombreApellidoHandler');
const GetPersonaByApellidoMaternoHandler = require('./handlers/getPersonaByApellidoMaternoHandler');
const GetPersonaByFechaNacimientoHandler = require('./handlers/getPersonaByFechaNacimientoHandler');
const GetPersonaByTelefonoHandler = require('./handlers/getPersonaByTelefonoHandler');
const GetPersonaByDireccionHandler = require('./handlers/getPersonaByDireccionHandler');
const PersonaController = require('./personaController');
const personaRoutes = require('./Routes/personaRoutes');

function init_personas(app) {
    let repository = new MySQLPersonaAdapter();
    // UseCases
    const createPersonaUseCase = new CreatePersonaUseCase(repository);
    const getPersonasUseCase = new GetPersonasUseCase(repository);
    const getPersonaByIdUseCase = new GetPersonaByIdUseCase({ personaRepository: repository });
    const getPersonaByNombreApellidoUseCase = new GetPersonaByNombreApellidoUseCase({ personaRepository: repository });
    const getPersonaByApellidoMaternoUseCase = new GetPersonaByApellidoMaternoUseCase({ personaRepository: repository });
    const getPersonaByFechaNacimientoUseCase = new GetPersonaByFechaNacimientoUseCase({ personaRepository: repository });
    const getPersonaByTelefonoUseCase = new GetPersonaByTelefonoUseCase({ personaRepository: repository });
    const getPersonaByDireccionUseCase = new GetPersonaByDireccionUseCase({ personaRepository: repository });
    const deletePersonaUseCase = new DeletePersonaUseCase({ personaRepository: repository });
    const putPersonaUseCase = new PutPersonaUseCase({ personaRepository: repository });
    // Handlers
    const createPersonaHandler = new CreatePersonaHandler(createPersonaUseCase);
    const getPersonasHandler = new GetPersonasHandler(getPersonasUseCase);
    const deletePersonaHandler = new DeletePersonaHandler(deletePersonaUseCase);
    const getPersonaByIdHandler = new GetPersonaByIdHandler(getPersonaByIdUseCase);
    const putPersonaHandler = new PutPersonaHandler(putPersonaUseCase);
    const getPersonaByNombreApellidoHandler = new GetPersonaByNombreApellidoHandler(getPersonaByNombreApellidoUseCase);
    const getPersonaByApellidoMaternoHandler = new GetPersonaByApellidoMaternoHandler(getPersonaByApellidoMaternoUseCase);
    const getPersonaByFechaNacimientoHandler = new GetPersonaByFechaNacimientoHandler(getPersonaByFechaNacimientoUseCase);
    const getPersonaByTelefonoHandler = new GetPersonaByTelefonoHandler(getPersonaByTelefonoUseCase);
    const getPersonaByDireccionHandler = new GetPersonaByDireccionHandler(getPersonaByDireccionUseCase);
    // Controller
    const personaController = new PersonaController(
        createPersonaHandler,
        getPersonasHandler,
        deletePersonaHandler,
        getPersonaByIdHandler,
        putPersonaHandler,
        getPersonaByNombreApellidoHandler,
        getPersonaByApellidoMaternoHandler,
        getPersonaByFechaNacimientoHandler,
        getPersonaByTelefonoHandler,
        getPersonaByDireccionHandler
    );

	const routes = personaRoutes(personaController);
	app.use('/personas', routes);
}

module.exports = { init_personas };