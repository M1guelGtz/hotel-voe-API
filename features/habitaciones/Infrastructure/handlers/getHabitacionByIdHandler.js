class GetHabitacionByIdHandler {
    constructor(getHabitacionByIdUseCase) {
        this.getHabitacionByIdUseCase = getHabitacionByIdUseCase;
    }

    async handle(id) {
        return await this.getHabitacionByIdUseCase.execute(id);
    }
}

module.exports = GetHabitacionByIdHandler;
