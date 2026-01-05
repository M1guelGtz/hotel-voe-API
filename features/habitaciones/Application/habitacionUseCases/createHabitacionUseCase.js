const Habitacion = require('../../Domain/habitacion');

class CreateHabitacionUseCase {
    constructor(habitacionRepository) {
        this.habitacionRepository = habitacionRepository;
    }

    async execute(habitacionData) {
        const habitacion = new Habitacion(null, habitacionData.pisoID, habitacionData.numero, habitacionData.tipo, habitacionData.capacidad, habitacionData.precioNoche, habitacionData.activo);
        return await this.habitacionRepository.create(habitacion);
    }
}

module.exports = CreateHabitacionUseCase;