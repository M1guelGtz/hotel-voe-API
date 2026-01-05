class GetHabitacionByCapacidadHandler {
    constructor(getHabitacionByCapacidadUseCase) {
        this.getHabitacionByCapacidadUseCase = getHabitacionByCapacidadUseCase;
    }

    async handle(req, res) {
        try {
            const { capacidad } = req.params;
            const habitaciones = await this.getHabitacionByCapacidadUseCase.execute(capacidad);
            res.status(200).json(habitaciones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetHabitacionByCapacidadHandler;