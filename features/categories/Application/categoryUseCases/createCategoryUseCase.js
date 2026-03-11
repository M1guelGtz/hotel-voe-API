const Category = require('../../Domain/category');

class CreateCategoryUseCase {
	constructor(categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	async execute(categoryData) {
		if (!categoryData || typeof categoryData.name !== 'string' || categoryData.name.trim() === '') {
			const err = new Error('name es requerido y debe ser un texto no vacío');
			err.statusCode = 400;
			throw err;
		}

		const sort_order = categoryData.sort_order !== undefined ? Number(categoryData.sort_order) : 0;
		if (!Number.isInteger(sort_order) || sort_order < 0 || sort_order > 255) {
			const err = new Error('sort_order debe ser un entero entre 0 y 255');
			err.statusCode = 400;
			throw err;
		}

		const category = new Category({
			name: categoryData.name.trim(),
			sort_order,
			is_active: categoryData.is_active !== undefined ? !!categoryData.is_active : true
		});

		return this.categoryRepository.createCategory(category);
	}
}

module.exports = CreateCategoryUseCase;
