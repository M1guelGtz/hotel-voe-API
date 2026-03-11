class PutCategoryHandler {
	constructor(putCategoryUseCase) {
		this.putCategoryUseCase = putCategoryUseCase;
	}

	async handle(req, res) {
		const { id } = req.params;
		const categoryData = req.body;
		try {
			const updated = await this.putCategoryUseCase.execute(id, categoryData);
			res.status(200).json({ category: updated });
		} catch (err) {
			res.status(err.statusCode || 500).json({ message: err.message });
		}
	}
}

module.exports = PutCategoryHandler;
