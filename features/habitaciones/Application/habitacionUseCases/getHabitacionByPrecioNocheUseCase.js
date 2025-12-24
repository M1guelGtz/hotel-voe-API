class GetHabitacionByPrecioNocheUseCase {
    constructor({ habitacionRepository }) {
        this.habitacionRepository = habitacionRepository;
    }

    async execute(precioNoche) {
        return await this.habitacionRepository.getByPrecioNoche(precioNoche);
    }
}

module.exports = GetHabitacionByPrecioNocheUseCase;