class GetHabitacionByCapacidadUseCase {
    constructor({ habitacionRepository }) {
        this.habitacionRepository = habitacionRepository;
    }

    async execute(capacidad) {
        return await this.habitacionRepository.getByCapacidad(capacidad);
    }
}

module.exports = GetHabitacionByCapacidadUseCase;