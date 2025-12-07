class GetHabitacionesHandler {
    constructor(getHabitacionesUseCase) {
        this.getHabitacionesUseCase = getHabitacionesUseCase;
    }

    async handle() {
        return await this.getHabitacionesUseCase.execute();
    }
}

module.exports = GetHabitacionesHandler;
