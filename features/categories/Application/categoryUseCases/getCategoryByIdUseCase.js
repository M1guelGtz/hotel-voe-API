class GetCategoryByIdUseCase {
	constructor({ categoryRepository }) {
		this.categoryRepository = categoryRepository;
	}

	async execute(id) {
		const category = await this.categoryRepository.getCategoryById(id);
		if (!category) {
			const err = new Error(`Category with ID ${id} not found`);
			err.statusCode = 404;
			throw err;
		}
		return { category };
	}
}

module.exports = GetCategoryByIdUseCase;
