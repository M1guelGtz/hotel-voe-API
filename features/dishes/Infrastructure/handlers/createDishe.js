class CreateDishHandler {
	constructor(createDishUseCase) {
		this.createDishUseCase = createDishUseCase;
	}

	async handle(req, res) {
		try {
			const dishData = req.body;
			const created = await this.createDishUseCase.execute(dishData);
			res.status(201).json(created);
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = CreateDishHandler;
