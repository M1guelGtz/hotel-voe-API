class PutHabitacionHandler {
    constructor(putHabitacionUseCase) {
        this.putHabitacionUseCase = putHabitacionUseCase;
    }

    async handle(req, res) {
        try {
            const { id } = req.params;
            const habitacionData = req.body;
            await this.putHabitacionUseCase.execute(id, habitacionData);
            res.status(200).json({ message: 'Habitacion updated' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PutHabitacionHandler;