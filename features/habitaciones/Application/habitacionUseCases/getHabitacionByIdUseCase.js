class GetHabitacionByIdUseCase {
    constructor({ habitacionRepository }) {
        this.habitacionRepository = habitacionRepository;
    }

    execute(id) {
        return this.habitacionRepository.getHabitacionById(id);
    }
}

module.exports = GetHabitacionByIdUseCase;
