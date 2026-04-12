class GetTicketBySessionUseCase {
    constructor(ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    async execute(sessionId) {
        return await this.ticketRepository.getTicketBySession(sessionId);
    }
}

module.exports = GetTicketBySessionUseCase;
