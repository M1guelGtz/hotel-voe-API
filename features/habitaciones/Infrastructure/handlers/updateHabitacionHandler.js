class UpdateHabitacionHandler {
    constructor(updateHabitacionUseCase) {
        this.updateHabitacionUseCase = updateHabitacionUseCase;
    }

    async handle(id, habitacionData) {
        return await this.updateHabitacionUseCase.execute(id, habitacionData);
    }
}

module.exports = UpdateHabitacionHandler;
