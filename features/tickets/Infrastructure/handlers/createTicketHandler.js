class CreateTicketHandler {
    constructor(createTicketUseCase) {
        this.createTicketUseCase = createTicketUseCase;
    }

    async handle(req, res) {
        try {
            const { session_id, payment_method, tip, discount, notes } = req.body;
            const waiter_id = req.user.id;

            console.log('createTicket request:', { session_id, waiter_id, payment_method, tip, discount, notes });

            const ticket = await this.createTicketUseCase.execute({
                session_id,
                waiter_id,
                payment_method,
                tip,
                discount,
                notes
            });

            res.status(201).json(ticket);
        } catch (err) {
            res.status(err.statusCode || 500).json({ message: err.message });
        }
    }
}

module.exports = CreateTicketHandler;
