class CreateCategoryHandler {
	constructor(createCategoryUseCase) {
		this.createCategoryUseCase = createCategoryUseCase;
	}

	async handle(req, res) {
		try {
			const categoryData = req.body;
			const created = await this.createCategoryUseCase.execute(categoryData);
			res.status(201).json({ category: created });
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = CreateCategoryHandler;
