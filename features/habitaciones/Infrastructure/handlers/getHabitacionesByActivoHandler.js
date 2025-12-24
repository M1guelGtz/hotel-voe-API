class GetHabitacionesByActivoHandler {
    constructor(getHabitacionesByActivoUseCase) {
        this.getHabitacionesByActivoUseCase = getHabitacionesByActivoUseCase;
    }

    async handle(req, res) {
        try {
            const activo = req.query.activo;
            const habitaciones = await this.getHabitacionesByActivoUseCase.execute(activo);
            res.status(200).json(habitaciones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetHabitacionesByActivoHandler;