class Dish {
	dishID;
	nombre;
	descripcion;
	precio;
	categoria;
	disponible;

	constructor({ dishID, nombre, descripcion, precio, categoria, disponible = true }) {
		this.dishID = dishID;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.precio = precio;
		this.categoria = categoria;
		this.disponible = disponible;
	}
}

module.exports = Dish;
