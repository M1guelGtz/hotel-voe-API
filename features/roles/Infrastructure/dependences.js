const MySQLRoleAdapter = require('./repository/mysql');

const CreateRoleUseCase = require('../Application/roleUseCases/createRoleUseCase');
const GetRolesUseCase = require('../Application/roleUseCases/getRolesUseCase');
const GetRoleByIdUseCase = require('../Application/roleUseCases/getRoleByIdUseCase');
const PutRoleUseCase = require('../Application/roleUseCases/putRoleUseCase');
const DeleteRoleUseCase = require('../Application/roleUseCases/deleteRoleUseCase');

const rolesRoutes = require('./routes/rolesRoutes');
const RolesController = require('./rolesController');

const CreateRoleHandler = require('./handlers/createRoleHandler');
const GetRolesHandler = require('./handlers/getRolesHandler');
const GetRoleByIdHandler = require('./handlers/getRoleByIdHandler');
const PutRoleHandler = require('./handlers/putRoleHandler');
const DeleteRoleHandler = require('./handlers/deleteRoleHandler');

function init_roles(app) {
	let repository;
	const useInMemory = process.env.USE_IN_MEMORY === 'true' || process.env.NODE_ENV === 'test';
	if (useInMemory) {
		const InMemory = require('./repository/inMemory');
		repository = new InMemory();
		console.log('Using InMemory role repository');
	} else {
		repository = new MySQLRoleAdapter();
	}

	const createRoleUseCase = new CreateRoleUseCase(repository);
	const getRolesUseCase = new GetRolesUseCase(repository);
	const getRoleByIdUseCase = new GetRoleByIdUseCase({ roleRepository: repository });
	const putRoleUseCase = new PutRoleUseCase({ roleRepository: repository });
	const deleteRoleUseCase = new DeleteRoleUseCase({ roleRepository: repository });

	const createRoleHandler = new CreateRoleHandler(createRoleUseCase);
	const getRolesHandler = new GetRolesHandler(getRolesUseCase);
	const getRoleByIdHandler = new GetRoleByIdHandler(getRoleByIdUseCase);
	const putRoleHandler = new PutRoleHandler(putRoleUseCase);
	const deleteRoleHandler = new DeleteRoleHandler(deleteRoleUseCase);

	const rolesController = new RolesController(
		createRoleHandler,
		getRolesHandler,
		getRoleByIdHandler,
		putRoleHandler,
		deleteRoleHandler
	);

	const routes = rolesRoutes(rolesController);
	app.use('/roles', routes);
}

module.exports = { init_roles };
