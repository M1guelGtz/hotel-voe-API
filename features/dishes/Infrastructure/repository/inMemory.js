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
			image_url: productData.image_url,
			is_available: true,
			is_active: true,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
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
		return this.products.slice();
	}

	async getDishById(id) {
		return this.products.find(p => p.id == id) || null;
	}

	async putDish(id, dishData) {
		const product = this.products.find(p => p.id == id);
		if (!product) return null;

		if (dishData.name !== undefined) product.name = dishData.name;
		if (dishData.description !== undefined) product.description = dishData.description;
		if (dishData.price !== undefined) product.price = dishData.price;
		if (dishData.area_id !== undefined) product.area_id = dishData.area_id;
		if (dishData.category_id !== undefined) product.category_id = dishData.category_id;
		if (dishData.image_url !== undefined) product.image_url = dishData.image_url;
		if (dishData.is_available !== undefined) product.is_available = !!dishData.is_available;
		if (dishData.is_active !== undefined) product.is_active = !!dishData.is_active;

		return product;
	}

	async deleteDish(id) {
		const index = this.products.findIndex(p => p.id == id);
		if (index === -1) return { deleted: false, id: Number(id) };
		this.products.splice(index, 1);
		return { deleted: true, id: Number(id) };
	}
}

module.exports = InMemoryDishRepository;
