class GetHabitacionByIdHandler {
    constructor(getHabitacionByIdUseCase) {
        this.getHabitacionByIdUseCase = getHabitacionByIdUseCase;
    }

    async handle(req, res) {
        try {
            const { id } = req.params;
            const habitacion = await this.getHabitacionByIdUseCase.execute(id);
            if (!habitacion) {
                return res.status(404).json({ error: 'Habitacion not found' });
            }
            res.status(200).json(habitacion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetHabitacionByIdHandler;
