class GetHabitacionByNumeroUseCase {
    constructor({ habitacionRepository }) {
        this.habitacionRepository = habitacionRepository;
    }

    execute(numero) {
        return this.habitacionRepository.getHabitacionByNumero(numero);
    }
}

module.exports = GetHabitacionByNumeroUseCase;
