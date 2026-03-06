class GetDishByIdHandler {
    constructor(getDishByIdUseCase) {
        this.getDishByIdUseCase = getDishByIdUseCase;
    }

    async handle(req, res) {
        try {
            const dish = await this.getDishByIdUseCase.execute(req.params.id);
            res.status(200).json(dish);
        } catch (err) {
            res.status(err.statusCode || 500).json({ message: err.message });
        }
    }
}

module.exports = GetDishByIdHandler;
