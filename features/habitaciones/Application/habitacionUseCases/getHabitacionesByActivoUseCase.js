class GetHabitacionesByActivoUseCase {
    constructor(habitacionRepository) {
        this.habitacionRepository = habitacionRepository;
    }

    async execute(activo) {
        return await this.habitacionRepository.getByActivo(activo);
    }
}

module.exports = GetHabitacionesByActivoUseCase;
