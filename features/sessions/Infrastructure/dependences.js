const MySQLSessionAdapter = require('./repository/mysql');

const CreateSessionUseCase = require('../Application/sessionUseCases/createSessionUseCase');
const GetSessionsUseCase = require('../Application/sessionUseCases/getSessionsUseCase');
const GetSessionByIdUseCase = require('../Application/sessionUseCases/getSessionByIdUseCase');
const CloseSessionUseCase = require('../Application/sessionUseCases/closeSessionUseCase');

const CreateSessionHandler = require('./handlers/createSessionHandler');
const GetSessionsHandler = require('./handlers/getSessionsHandler');
const GetSessionByIdHandler = require('./handlers/getSessionByIdHandler');
const CloseSessionHandler = require('./handlers/closeSessionHandler');

const SessionsController = require('./sessionsController');
const sessionsRoutes = require('./routes/sessionsRoutes');

function init_sessions(app) {
  const sessionRepository = new MySQLSessionAdapter();

  const createSessionUseCase = new CreateSessionUseCase(sessionRepository);
  const getSessionsUseCase = new GetSessionsUseCase(sessionRepository);
  const getSessionByIdUseCase = new GetSessionByIdUseCase(sessionRepository);
  const closeSessionUseCase = new CloseSessionUseCase(sessionRepository);

  const createSessionHandler = new CreateSessionHandler(createSessionUseCase);
  const getSessionsHandler = new GetSessionsHandler(getSessionsUseCase);
  const getSessionByIdHandler = new GetSessionByIdHandler(getSessionByIdUseCase);
  const closeSessionHandler = new CloseSessionHandler(closeSessionUseCase);

  const controller = new SessionsController(
    createSessionHandler,
    getSessionsHandler,
    getSessionByIdHandler,
    closeSessionHandler
  );

  const router = sessionsRoutes(controller);
  app.use('/sessions', router);
}

module.exports = { init_sessions };
