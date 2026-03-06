class GetDishesHandler {
    constructor(getDishesUseCase) {
        this.getDishesUseCase = getDishesUseCase;
    }

    async handle(req, res) {
        try {
            const dishes = await this.getDishesUseCase.execute();
            res.status(200).json(dishes);
        } catch (err) {
            res.status(err.statusCode || 500).json({ message: err.message });
        }
    }
}

module.exports = GetDishesHandler;
