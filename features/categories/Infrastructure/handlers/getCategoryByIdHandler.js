class GetCategoryByIdHandler {
	constructor(getCategoryByIdUseCase) {
		this.getCategoryByIdUseCase = getCategoryByIdUseCase;
	}

	async handle(req, res) {
		try {
			const category = await this.getCategoryByIdUseCase.execute(req.params.id);
			res.status(200).json(category);
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = GetCategoryByIdHandler;
