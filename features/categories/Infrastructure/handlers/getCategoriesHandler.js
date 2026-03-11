class GetCategoriesHandler {
	constructor(getCategoriesUseCase) {
		this.getCategoriesUseCase = getCategoriesUseCase;
	}

	async handle(req, res) {
		try {
			const categories = await this.getCategoriesUseCase.execute();
			res.status(200).json(categories);
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = GetCategoriesHandler;
