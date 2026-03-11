class DeleteDishUseCase {
    constructor({ dishRepository }) {
        this.dishRepository = dishRepository;
    }

    async execute(id) {
        const product = await this.dishRepository.getDishById(id);
        if (!product) {
            const err = new Error(`Product with ID ${id} not found`);
            err.statusCode = 404;
            throw err;
        }
        return this.dishRepository.deleteDish(id);
    }
}

module.exports = DeleteDishUseCase;
