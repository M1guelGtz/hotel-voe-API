const CategoryRepository = require('../../Domain/categoryRepository');

class InMemoryCategoryRepository extends CategoryRepository {
	constructor() {
		super();
		this.categories = [];
		this.nextId = 1;
	}

	async createCategory(categoryData) {
		const exists = this.categories.find(c => c.name.toLowerCase() === categoryData.name.toLowerCase());
		if (exists) {
			const err = new Error('La categoría ya existe');
			err.statusCode = 409;
			throw err;
		}

		const newCategory = {
			id: this.nextId++,
			name: categoryData.name,
			sort_order: categoryData.sort_order,
			is_active: !!categoryData.is_active
		};
		this.categories.push(newCategory);
		return newCategory;
	}

	async getCategories() {
		return this.categories
			.slice()
			.sort((a, b) => (a.sort_order - b.sort_order) || a.name.localeCompare(b.name));
	}

	async getCategoryById(id) {
		return this.categories.find(c => c.id == id) || null;
	}

	async putCategory(id, categoryData) {
		const index = this.categories.findIndex(c => c.id == id);
		if (index === -1) return null;

		const duplicate = this.categories.find(c => c.id != id && c.name.toLowerCase() === categoryData.name.toLowerCase());
		if (duplicate) {
			const err = new Error('La categoría ya existe');
			err.statusCode = 409;
			throw err;
		}

		this.categories[index] = {
			id: Number(id),
			name: categoryData.name,
			sort_order: categoryData.sort_order,
			is_active: !!categoryData.is_active
		};
		return this.categories[index];
	}

	async deleteCategory(id) {
		const index = this.categories.findIndex(c => c.id == id);
		if (index === -1) return { deleted: false, id: Number(id) };
		this.categories.splice(index, 1);
		return { deleted: true, id: Number(id) };
	}
}

module.exports = InMemoryCategoryRepository;
