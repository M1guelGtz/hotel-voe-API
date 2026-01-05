class DeleteHuespedHandler {
    constructor(deleteHuespedUseCase) {
        this.deleteHuespedUseCase = deleteHuespedUseCase;
    }

    async handle(req, res) {
        try {
            const { id } = req.params;
            await this.deleteHuespedUseCase.execute(id);
            res.status(200).json({ message: 'Huesped deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = DeleteHuespedHandler;