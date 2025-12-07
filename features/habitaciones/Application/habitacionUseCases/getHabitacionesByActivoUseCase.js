class GetHabitacionesByActivoUseCase {
    constructor(habitacionRepository) {
        this.habitacionRepository = habitacionRepository;
    }

    execute() {
        return this.habitacionRepository.getHabitacionesByActivo();
    }
}

module.exports = GetHabitacionesByActivoUseCase;
