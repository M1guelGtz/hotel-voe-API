class CategoryRepository {
	async createCategory(categoryData) {
		throw new Error('createCategory method must be implemented');
	}

	async getCategories() {
		throw new Error('getCategories method must be implemented');
	}

	async getCategoryById(id) {
		throw new Error('getCategoryById method must be implemented');
	}

	async putCategory(id, categoryData) {
		throw new Error('putCategory method must be implemented');
	}

	async deleteCategory(id) {
		throw new Error('deleteCategory method must be implemented');
	}
}

module.exports = CategoryRepository;
