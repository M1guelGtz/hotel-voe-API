const MySQLAdapter = require('./Repository/mysql');
const CreateUserUseCase = require('../Application/userUseCases/createUserUseCase');
const GetUsersUseCase = require('../Application/userUseCases/getUsersUseCase');
const productRoutes = require('./Routes/usersRoutes');
const UserController = require('./userController');
const CreateUserController = require('./handlers/createProductHandler');
const GetUsersController = require('./handlers/getProductHandler');
function init_users(app) {
    //repository - choose adapter by env (USE_IN_MEMORY=true or NODE_ENV=test to use memory)
    let repository;
    const useInMemory = process.env.USE_IN_MEMORY === 'true' || process.env.NODE_ENV === 'test';
    if (useInMemory) {
        const InMemory = require('./Repository/inMemory');
        repository = new InMemory();
        console.log('Using InMemory user repository');
    } else {
        repository = new MySQLAdapter();
    }

    //use cases
    const createUserUseCase = new CreateUserUseCase(repository);
    const getUsersUseCase = new GetUsersUseCase(repository);


    //controllers
    const createUserController = new CreateUserController(createUserUseCase);
    const getUsersController = new GetUsersController(getUsersUseCase);

    //controlador general
    const userController = new UserController(createUserController, getUsersController);

    const routes = productRoutes(userController);
    app.use('/users', routes);

}

module.exports = { init_users };