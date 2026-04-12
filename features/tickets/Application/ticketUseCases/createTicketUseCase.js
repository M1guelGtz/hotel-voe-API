class CreateTicketUseCase {
    constructor(ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    async execute(ticketData) {
        return await this.ticketRepository.createTicket(ticketData);
    }
}

module.exports = CreateTicketUseCase;
