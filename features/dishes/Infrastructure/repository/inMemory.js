const DishRepository = require('../../Domain/dishRepository');

class InMemoryDishRepository extends DishRepository {
	constructor() {
		super();
		this.dishes = [];
		this.products = [];
		this.nextDishId = 1;
		this.nextProductId = 1;
		// Mock data for testing
		this.areas = [{ id: 1, name: 'Test Area' }];
		this.categories = [{ id: 1, name: 'Test Category' }];
	}

	async createProduct(productData) {
		// Simulate area/category validation
		const area = this.areas.find(a => a.id === productData.area_id);
		if (!area) throw new Error('El área especificada no existe');

		if (productData.category_id) {
			const category = this.categories.find(c => c.id === productData.category_id);
			if (!category) throw new Error('La categoría especificada no existe');
		}

		const newProduct = {
			id: this.nextProductId++,
			name: productData.name,
			description: productData.description,
			price: productData.price,
			area_id: productData.area_id,
			category_id: productData.category_id,
			image_url: productData.image_url
		};
		this.products.push(newProduct);
		return newProduct;
	}

	async postDish(dish) {
		const newDish = {
			dishID: this.nextDishId++,
			nombre: dish.nombre,
			descripcion: dish.descripcion,
			precio: dish.precio,
			categoria: dish.categoria,
			disponible: dish.disponible
		};
		this.dishes.push(newDish);
		return newDish;
	}

	async getDishes() {
		return this.dishes.slice();
	}

	async getDishById(id) {
		return this.dishes.find(d => d.dishID == id) || null;
	}

	async putDish(id, dishData) {
		const dish = this.dishes.find(d => d.dishID == id);
		if (!dish) return null;

		if (dishData.nombre !== undefined) dish.nombre = dishData.nombre;
		if (dishData.descripcion !== undefined) dish.descripcion = dishData.descripcion;
		if (dishData.precio !== undefined) dish.precio = dishData.precio;
		if (dishData.categoria !== undefined) dish.categoria = dishData.categoria;
		if (dishData.disponible !== undefined) dish.disponible = !!dishData.disponible;

		return dish;
	}

	async deleteDish(id) {
		const index = this.dishes.findIndex(d => d.dishID == id);
		if (index === -1) return false;
		this.dishes.splice(index, 1);
		return true;
	}
}

module.exports = InMemoryDishRepository;
