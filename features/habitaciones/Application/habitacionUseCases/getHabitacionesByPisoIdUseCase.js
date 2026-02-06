class GetHabitacionesByPisoIdUseCase {
    constructor({ habitacionRepository }) {
        this.habitacionRepository = habitacionRepository;
    }

    async execute(pisoID) {
        return await this.habitacionRepository.getByPisoId(pisoID);
    }
}

module.exports = GetHabitacionesByPisoIdUseCase;