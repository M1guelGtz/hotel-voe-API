class DeleteHabitacionHandler {
    constructor(deleteHabitacionUseCase) {
        this.deleteHabitacionUseCase = deleteHabitacionUseCase;
    }

    async handle(req, res) {
        try {
            const { id } = req.params;
            await this.deleteHabitacionUseCase.execute(id);
            res.status(200).json({ message: 'Habitacion deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = DeleteHabitacionHandler;
