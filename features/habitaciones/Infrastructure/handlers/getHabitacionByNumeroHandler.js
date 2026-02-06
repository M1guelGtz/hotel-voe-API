class GetHabitacionByNumeroHandler {
    constructor(getHabitacionByNumeroUseCase) {
        this.getHabitacionByNumeroUseCase = getHabitacionByNumeroUseCase;
    }

    async handle(req, res) {
        try {
            const { numero } = req.params;
            const habitacion = await this.getHabitacionByNumeroUseCase.execute(numero);
            if (!habitacion) {
                return res.status(404).json({ error: 'Habitacion not found' });
            }
            res.status(200).json(habitacion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetHabitacionByNumeroHandler;
