const MySQLCategoryAdapter = require('./repository/mysql');

const CreateCategoryUseCase = require('../Application/categoryUseCases/createCategoryUseCase');
const GetCategoriesUseCase = require('../Application/categoryUseCases/getCategoriesUseCase');
const GetCategoryByIdUseCase = require('../Application/categoryUseCases/getCategoryByIdUseCase');
const PutCategoryUseCase = require('../Application/categoryUseCases/putCategoryUseCase');
const DeleteCategoryUseCase = require('../Application/categoryUseCases/deleteCategoryUseCase');

const categoriesRoutes = require('./routes/categoriesRoutes');
const CategoriesController = require('./categoriesController');

const CreateCategoryHandler = require('./handlers/createCategoryHandler');
const GetCategoriesHandler = require('./handlers/getCategoriesHandler');
const GetCategoryByIdHandler = require('./handlers/getCategoryByIdHandler');
const PutCategoryHandler = require('./handlers/putCategoryHandler');
const DeleteCategoryHandler = require('./handlers/deleteCategoryHandler');

function init_categories(app) {
	let repository;
	const useInMemory = process.env.USE_IN_MEMORY === 'true' || process.env.NODE_ENV === 'test';
	if (useInMemory) {
		const InMemory = require('./repository/inMemory');
		repository = new InMemory();
		console.log('Using InMemory category repository');
	} else {
		repository = new MySQLCategoryAdapter();
	}

	const createCategoryUseCase = new CreateCategoryUseCase(repository);
	const getCategoriesUseCase = new GetCategoriesUseCase(repository);
	const getCategoryByIdUseCase = new GetCategoryByIdUseCase({ categoryRepository: repository });
	const putCategoryUseCase = new PutCategoryUseCase({ categoryRepository: repository });
	const deleteCategoryUseCase = new DeleteCategoryUseCase({ categoryRepository: repository });

	const createCategoryHandler = new CreateCategoryHandler(createCategoryUseCase);
	const getCategoriesHandler = new GetCategoriesHandler(getCategoriesUseCase);
	const getCategoryByIdHandler = new GetCategoryByIdHandler(getCategoryByIdUseCase);
	const putCategoryHandler = new PutCategoryHandler(putCategoryUseCase);
	const deleteCategoryHandler = new DeleteCategoryHandler(deleteCategoryUseCase);

	const categoriesController = new CategoriesController(
		createCategoryHandler,
		getCategoriesHandler,
		getCategoryByIdHandler,
		putCategoryHandler,
		deleteCategoryHandler
	);

	const routes = categoriesRoutes(categoriesController);
	app.use('/categories', routes);
}

module.exports = { init_categories };
