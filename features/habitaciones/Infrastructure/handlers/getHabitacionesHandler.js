class GetHabitacionesHandler {
    constructor(getHabitacionesUseCase) {
        this.getHabitacionesUseCase = getHabitacionesUseCase;
    }

    async handle(req, res) {
        try {
            const habitaciones = await this.getHabitacionesUseCase.execute();
            res.status(200).json(habitaciones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetHabitacionesHandler;
