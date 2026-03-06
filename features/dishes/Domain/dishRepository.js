class DishRepository {
	async postDish(dish) {
		throw new Error('postDish method must be implemented');
	}

	async getDishes() {
		throw new Error('getDishes method must be implemented');
	}

	async getDishById(id) {
		throw new Error('getDishById method must be implemented');
	}

	async putDish(id, dishData) {
		throw new Error('putDish method must be implemented');
	}

	async deleteDish(id) {
		throw new Error('deleteDish method must be implemented');
	}
}

module.exports = DishRepository;
