class GetHabitacionesUseCase {
    constructor(habitacionRepository) {
        this.habitacionRepository = habitacionRepository;
    }

    async execute() {
        return await this.habitacionRepository.getAll();
    }
}

module.exports = GetHabitacionesUseCase;