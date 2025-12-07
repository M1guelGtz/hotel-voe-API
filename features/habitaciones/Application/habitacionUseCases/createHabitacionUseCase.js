class CreateHabitacionUseCase {
    constructor(habitacionRepository) {
        this.habitacionRepository = habitacionRepository;
    }

    execute(habitacion) {
        return this.habitacionRepository.createHabitacion(habitacion);
    }
}

module.exports = CreateHabitacionUseCase;
