class DeleteHabitacionHandler {
    constructor(deleteHabitacionUseCase) {
        this.deleteHabitacionUseCase = deleteHabitacionUseCase;
    }

    async handle(id) {
        return await this.deleteHabitacionUseCase.execute(id);
    }
}

module.exports = DeleteHabitacionHandler;
