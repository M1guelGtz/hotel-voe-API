class GetTicketByIdUseCase {
    constructor(ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    async execute(id) {
        return await this.ticketRepository.getTicketById(id);
    }
}

module.exports = GetTicketByIdUseCase;
