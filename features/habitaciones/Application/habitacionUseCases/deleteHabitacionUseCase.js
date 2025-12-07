class DeleteHabitacionUseCase {
    constructor({ habitacionRepository }) {
        this.habitacionRepository = habitacionRepository;
    }

    execute(id) {
        return this.habitacionRepository.deleteHabitacion(id);
    }
}

module.exports = DeleteHabitacionUseCase;
