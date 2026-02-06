class DeleteHabitacionUseCase {
    constructor({ habitacionRepository }) {
        this.habitacionRepository = habitacionRepository;
    }

    async execute(habitacionID) {
        return await this.habitacionRepository.delete(habitacionID);
    }
}

module.exports = DeleteHabitacionUseCase;