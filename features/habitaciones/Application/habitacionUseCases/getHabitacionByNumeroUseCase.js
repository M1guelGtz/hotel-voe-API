class GetHabitacionByNumeroUseCase {
    constructor({ habitacionRepository }) {
        this.habitacionRepository = habitacionRepository;
    }

    async execute(numero) {
        return await this.habitacionRepository.getByNumero(numero);
    }
}

module.exports = GetHabitacionByNumeroUseCase;