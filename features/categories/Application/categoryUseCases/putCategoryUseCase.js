class PutCategoryUseCase {
	constructor({ categoryRepository }) {
		this.categoryRepository = categoryRepository;
	}

	async execute(id, categoryData) {
		const currentCategory = await this.categoryRepository.getCategoryById(id);
		if (!currentCategory) {
			const err = new Error(`Category with ID ${id} not found`);
			err.statusCode = 404;
			throw err;
		}

		if (categoryData.name !== undefined) {
			if (typeof categoryData.name !== 'string' || categoryData.name.trim() === '') {
				const err = new Error('name debe ser un texto no vacío');
				err.statusCode = 400;
				throw err;
			}
		}

		if (categoryData.sort_order !== undefined) {
			const sort_order = Number(categoryData.sort_order);
			if (!Number.isInteger(sort_order) || sort_order < 0 || sort_order > 255) {
				const err = new Error('sort_order debe ser un entero entre 0 y 255');
				err.statusCode = 400;
				throw err;
			}
		}

		const payload = {
			name: categoryData.name !== undefined ? categoryData.name.trim() : currentCategory.name,
			sort_order: categoryData.sort_order !== undefined ? Number(categoryData.sort_order) : currentCategory.sort_order,
			is_active: categoryData.is_active !== undefined ? !!categoryData.is_active : !!currentCategory.is_active
		};

		return this.categoryRepository.putCategory(id, payload);
	}
}

module.exports = PutCategoryUseCase;
