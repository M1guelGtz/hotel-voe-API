class GetTicketsHandler {
    constructor(getTicketsUseCase) {
        this.getTicketsUseCase = getTicketsUseCase;
    }

    async handle(req, res) {
        try {
            const filters = {};
            if (req.query.date) {
                filters.date = req.query.date;
            }

            const tickets = await this.getTicketsUseCase.execute(filters);
            res.status(200).json(tickets);
        } catch (err) {
            res.status(err.statusCode || 500).json({ message: err.message });
        }
    }
}

module.exports = GetTicketsHandler;
