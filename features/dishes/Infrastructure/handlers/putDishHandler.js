class PutDishHandler {
    constructor(putDishUseCase) {
        this.putDishUseCase = putDishUseCase;
    }

    async handle(req, res) {
        const { id } = req.params;
        const dishData = req.body;
        try {
            const updated = await this.putDishUseCase.execute(id, dishData);
            res.status(200).json({ product: updated });
        } catch (err) {
            res.status(err.statusCode || 500).json({ message: err.message });
        }
    }
}

module.exports = PutDishHandler;
