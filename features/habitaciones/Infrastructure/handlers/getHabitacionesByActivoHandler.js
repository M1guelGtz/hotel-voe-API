class GetHabitacionesByActivoHandler {
    constructor(getHabitacionesByActivoUseCase) {
        this.getHabitacionesByActivoUseCase = getHabitacionesByActivoUseCase;
    }

    async handle() {
        return await this.getHabitacionesByActivoUseCase.execute();
    }
}

module.exports = GetHabitacionesByActivoHandler;
