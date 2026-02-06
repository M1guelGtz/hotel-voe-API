class UpdateHabitacionUseCase {
    constructor({ habitacionRepository }) {
        this.habitacionRepository = habitacionRepository;
    }

    execute(id, habitacionData) {
        return this.habitacionRepository.updateHabitacion(id, habitacionData);
    }
}

module.exports = UpdateHabitacionUseCase;
