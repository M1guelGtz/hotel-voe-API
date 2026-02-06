class PutHabitacionUseCase {
    constructor({ habitacionRepository }) {
        this.habitacionRepository = habitacionRepository;
    }

    async execute(habitacionID, habitacionData) {
        return await this.habitacionRepository.update(habitacionID, habitacionData);
    }
}

module.exports = PutHabitacionUseCase;