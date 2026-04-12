const MySQLTicketAdapter = require('./repository/mysql');

const CreateTicketUseCase = require('../Application/ticketUseCases/createTicketUseCase');
const GetTicketsUseCase = require('../Application/ticketUseCases/getTicketsUseCase');
const GetTicketByIdUseCase = require('../Application/ticketUseCases/getTicketByIdUseCase');
const GetTicketBySessionUseCase = require('../Application/ticketUseCases/getTicketBySessionUseCase');

const CreateTicketHandler = require('./handlers/createTicketHandler');
const GetTicketsHandler = require('./handlers/getTicketsHandler');
const GetTicketByIdHandler = require('./handlers/getTicketByIdHandler');
const GetTicketBySessionHandler = require('./handlers/getTicketBySessionHandler');

const TicketsController = require('./ticketsController');
const ticketsRoutes = require('./routes/ticketsRoutes');

function init_tickets(app) {
    // Repository
    const ticketRepository = new MySQLTicketAdapter();

    // Use Cases
    const createTicketUseCase = new CreateTicketUseCase(ticketRepository);
    const getTicketsUseCase = new GetTicketsUseCase(ticketRepository);
    const getTicketByIdUseCase = new GetTicketByIdUseCase(ticketRepository);
    const getTicketBySessionUseCase = new GetTicketBySessionUseCase(ticketRepository);

    // Handlers
    const createTicketHandler = new CreateTicketHandler(createTicketUseCase);
    const getTicketsHandler = new GetTicketsHandler(getTicketsUseCase);
    const getTicketByIdHandler = new GetTicketByIdHandler(getTicketByIdUseCase);
    const getTicketBySessionHandler = new GetTicketBySessionHandler(getTicketBySessionUseCase);

    // Controller
    const controller = new TicketsController(
        createTicketHandler,
        getTicketsHandler,
        getTicketByIdHandler,
        getTicketBySessionHandler
    );

    // Routes
    app.use('/tickets', ticketsRoutes(controller));
}

module.exports = { init_tickets };
