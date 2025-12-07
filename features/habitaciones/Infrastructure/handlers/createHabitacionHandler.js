const Habitacion = require('../../Domain/habitacion');

class CreateHabitacionHandler {
    constructor(createHabitacionUseCase) {
        this.createHabitacionUseCase = createHabitacionUseCase;
    }

    async handle(habitacionData) {
        const habitacion = new Habitacion(habitacionData);
        return await this.createHabitacionUseCase.execute(habitacion);
    }
}

module.exports = CreateHabitacionHandler;
