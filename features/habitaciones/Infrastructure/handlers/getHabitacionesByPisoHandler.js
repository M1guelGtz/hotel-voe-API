class GetHabitacionesByPisoHandler {
    constructor(getHabitacionesByPisoUseCase) {
        this.getHabitacionesByPisoUseCase = getHabitacionesByPisoUseCase;
    }

    async handle(pisoID) {
        return await this.getHabitacionesByPisoUseCase.execute(pisoID);
    }
}

module.exports = GetHabitacionesByPisoHandler;
