class PutHuespedHandler {
    constructor(putHuespedUseCase) {
        this.putHuespedUseCase = putHuespedUseCase;
    }

    async handle(req, res) {
        try {
            const { id } = req.params;
            const huespedData = req.body;
            await this.putHuespedUseCase.execute(id, huespedData);
            res.status(200).json({ message: 'Huesped updated' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PutHuespedHandler;