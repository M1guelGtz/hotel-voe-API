class GetDishesUseCase {
    constructor(dishRepository) {
        this.dishRepository = dishRepository;
    }

    execute() {
        return this.dishRepository.getDishes();
    }
}

module.exports = GetDishesUseCase;
