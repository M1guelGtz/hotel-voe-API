class GetHabitacionesByTipoUseCase {
    constructor({ habitacionRepository }) {
        this.habitacionRepository = habitacionRepository;
    }

    execute(tipo) {
        return this.habitacionRepository.getHabitacionesByTipo(tipo);
    }
}

module.exports = GetHabitacionesByTipoUseCase;
