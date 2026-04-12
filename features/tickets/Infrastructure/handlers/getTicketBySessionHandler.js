class GetTicketBySessionHandler {
    constructor(getTicketBySessionUseCase) {
        this.getTicketBySessionUseCase = getTicketBySessionUseCase;
    }

    async handle(req, res) {
        try {
            const { sessionId } = req.params;
            const ticket = await this.getTicketBySessionUseCase.execute(sessionId);
            res.status(200).json(ticket);
        } catch (err) {
            res.status(err.statusCode || 500).json({ message: err.message });
        }
    }
}

module.exports = GetTicketBySessionHandler;
