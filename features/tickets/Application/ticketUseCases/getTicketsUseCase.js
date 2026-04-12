class GetTicketsUseCase {
    constructor(ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    async execute(filters) {
        return await this.ticketRepository.getTickets(filters);
    }
}

module.exports = GetTicketsUseCase;
