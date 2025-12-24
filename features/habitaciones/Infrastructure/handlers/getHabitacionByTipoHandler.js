class GetHabitacionByTipoHandler {
    constructor(getHabitacionByTipoUseCase) {
        this.getHabitacionByTipoUseCase = getHabitacionByTipoUseCase;
    }

    async handle(req, res) {
        try {
            const { tipo } = req.params;
            const habitaciones = await this.getHabitacionByTipoUseCase.execute(tipo);
            res.status(200).json(habitaciones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetHabitacionByTipoHandler;