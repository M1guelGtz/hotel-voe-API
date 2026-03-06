class GetDishByIdUseCase {
    constructor({ dishRepository }) {
        this.dishRepository = dishRepository;
    }

    async execute(id) {
        const dish = await this.dishRepository.getDishById(id);
        if (!dish) {
            const err = new Error(`Dish with ID ${id} not found`);
            err.statusCode = 404;
            throw err;
        }
        return { dish };
    }
}

module.exports = GetDishByIdUseCase;
