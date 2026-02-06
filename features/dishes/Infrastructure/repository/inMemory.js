const DishRepository = require('../../Domain/dishRepository');

class InMemoryDishRepository extends DishRepository {
	constructor() {
		super();
		this.dishes = [];
		this.nextId = 1;
	}

	async postDish(dish) {
		const newDish = {
			dishID: this.nextId++,
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
