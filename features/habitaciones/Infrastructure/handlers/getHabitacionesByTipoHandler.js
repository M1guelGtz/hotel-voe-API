class GetHabitacionesByTipoHandler {
    constructor(getHabitacionesByTipoUseCase) {
        this.getHabitacionesByTipoUseCase = getHabitacionesByTipoUseCase;
    }

    async handle(tipo) {
        return await this.getHabitacionesByTipoUseCase.execute(tipo);
    }
}

module.exports = GetHabitacionesByTipoHandler;
