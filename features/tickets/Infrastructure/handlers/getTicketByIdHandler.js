class GetTicketByIdHandler {
    constructor(getTicketByIdUseCase) {
        this.getTicketByIdUseCase = getTicketByIdUseCase;
    }

    async handle(req, res) {
        try {
            const { id } = req.params;
            const ticket = await this.getTicketByIdUseCase.execute(id);
            res.status(200).json(ticket);
        } catch (err) {
            res.status(err.statusCode || 500).json({ message: err.message });
        }
    }
}

module.exports = GetTicketByIdHandler;
