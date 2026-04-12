class TicketsController {
    constructor(createTicketHandler, getTicketsHandler, getTicketByIdHandler, getTicketBySessionHandler) {
        this.createTicketHandler = createTicketHandler;
        this.getTicketsHandler = getTicketsHandler;
        this.getTicketByIdHandler = getTicketByIdHandler;
        this.getTicketBySessionHandler = getTicketBySessionHandler;
    }
}

module.exports = TicketsController;
