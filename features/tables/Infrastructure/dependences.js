const MySQLTableAdapter = require('./repository/mysql');

const CreateTableUseCase = require('../Application/tableUseCases/createTableUseCase');
const GetTablesUseCase = require('../Application/tableUseCases/getTablesUseCase');
const GetTableByIdUseCase = require('../Application/tableUseCases/getTableByIdUseCase');
const PutTableUseCase = require('../Application/tableUseCases/putTableUseCase');
const DeleteTableUseCase = require('../Application/tableUseCases/deleteTableUseCase');

const tablesRoutes = require('./routes/tablesRoutes');
const TablesController = require('./tablesController');

const CreateTableHandler = require('./handlers/createTableHandler');
const GetTablesHandler = require('./handlers/getTablesHandler');
const GetTableByIdHandler = require('./handlers/getTableByIdHandler');
const PutTableHandler = require('./handlers/putTableHandler');
const DeleteTableHandler = require('./handlers/deleteTableHandler');

function init_tables(app) {
	let repository;
	const useInMemory = process.env.USE_IN_MEMORY === 'true' || process.env.NODE_ENV === 'test';
	if (useInMemory) {
		const InMemory = require('./repository/inMemory');
		repository = new InMemory();
		console.log('Using InMemory table repository');
	} else {
		repository = new MySQLTableAdapter();
	}

	const createTableUseCase = new CreateTableUseCase(repository);
	const getTablesUseCase = new GetTablesUseCase(repository);
	const getTableByIdUseCase = new GetTableByIdUseCase({ tableRepository: repository });
	const putTableUseCase = new PutTableUseCase({ tableRepository: repository });
	const deleteTableUseCase = new DeleteTableUseCase({ tableRepository: repository });

	const createTableHandler = new CreateTableHandler(createTableUseCase);
	const getTablesHandler = new GetTablesHandler(getTablesUseCase);
	const getTableByIdHandler = new GetTableByIdHandler(getTableByIdUseCase);
	const putTableHandler = new PutTableHandler(putTableUseCase);
	const deleteTableHandler = new DeleteTableHandler(deleteTableUseCase);

	const controller = new TablesController({
		createTableHandler,
		getTablesHandler,
		getTableByIdHandler,
		putTableHandler,
		deleteTableHandler
	});

	const router = tablesRoutes(controller);
	app.use('/tables', router);

	console.log('Tables feature initialized at /tables');
}

module.exports = { init_tables };
