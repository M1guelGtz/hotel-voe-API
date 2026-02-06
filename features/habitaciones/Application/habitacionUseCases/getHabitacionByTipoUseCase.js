class GetHabitacionByTipoUseCase {
    constructor({ habitacionRepository }) {
        this.habitacionRepository = habitacionRepository;
    }

    async execute(tipo) {
        return await this.habitacionRepository.getByTipo(tipo);
    }
}

module.exports = GetHabitacionByTipoUseCase;