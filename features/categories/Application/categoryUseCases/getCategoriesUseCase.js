class GetCategoriesUseCase {
	constructor(categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	execute() {
		return this.categoryRepository.getCategories();
	}
}

module.exports = GetCategoriesUseCase;
