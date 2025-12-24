class GetHabitacionByPrecioNocheHandler {
    constructor(getHabitacionByPrecioNocheUseCase) {
        this.getHabitacionByPrecioNocheUseCase = getHabitacionByPrecioNocheUseCase;
    }

    async handle(req, res) {
        try {
            const precioNoche = req.query.precioNoche;
            const habitaciones = await this.getHabitacionByPrecioNocheUseCase.execute(precioNoche);
            res.status(200).json(habitaciones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetHabitacionByPrecioNocheHandler;