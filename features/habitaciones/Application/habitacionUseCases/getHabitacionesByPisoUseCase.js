class GetHabitacionesByPisoUseCase {
    constructor({ habitacionRepository }) {
        this.habitacionRepository = habitacionRepository;
    }

    execute(pisoID) {
        return this.habitacionRepository.getHabitacionesByPiso(pisoID);
    }
}

module.exports = GetHabitacionesByPisoUseCase;
