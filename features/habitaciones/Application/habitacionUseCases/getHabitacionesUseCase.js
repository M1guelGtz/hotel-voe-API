class GetHabitacionesUseCase {
    constructor(habitacionRepository) {
        this.habitacionRepository = habitacionRepository;
    }

    execute() {
        return this.habitacionRepository.getHabitaciones();
    }
}

module.exports = GetHabitacionesUseCase;
