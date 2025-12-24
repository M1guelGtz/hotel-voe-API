class GetHabitacionesByPisoIdHandler {
    constructor(getHabitacionesByPisoIdUseCase) {
        this.getHabitacionesByPisoIdUseCase = getHabitacionesByPisoIdUseCase;
    }

    async handle(req, res) {
        try {
            const { pisoID } = req.params;
            const habitaciones = await this.getHabitacionesByPisoIdUseCase.execute(pisoID);
            res.status(200).json(habitaciones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetHabitacionesByPisoIdHandler;