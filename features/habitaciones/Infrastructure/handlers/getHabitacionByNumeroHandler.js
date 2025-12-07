class GetHabitacionByNumeroHandler {
    constructor(getHabitacionByNumeroUseCase) {
        this.getHabitacionByNumeroUseCase = getHabitacionByNumeroUseCase;
    }

    async handle(numero) {
        return await this.getHabitacionByNumeroUseCase.execute(numero);
    }
}

module.exports = GetHabitacionByNumeroHandler;
