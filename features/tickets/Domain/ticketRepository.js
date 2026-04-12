class TicketRepository {
    async createTicket(ticketData) {
        throw new Error('Method "createTicket" must be implemented');
    }

    async getTickets() {
        throw new Error('Method "getTickets" must be implemented');
    }

    async getTicketById(id) {
        throw new Error('Method "getTicketById" must be implemented');
    }

    async getTicketBySession(sessionId) {
        throw new Error('Method "getTicketBySession" must be implemented');
    }
}

module.exports = TicketRepository;
