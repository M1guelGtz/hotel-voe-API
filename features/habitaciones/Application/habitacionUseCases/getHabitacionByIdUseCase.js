class GetHabitacionByIdUseCase {
    constructor({ habitacionRepository }) {
        this.habitacionRepository = habitacionRepository;
    }

    async execute(habitacionID) {
        return await this.habitacionRepository.getById(habitacionID);
    }
}

module.exports = GetHabitacionByIdUseCase;
