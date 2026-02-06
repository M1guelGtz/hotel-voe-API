const db = require('../../../../core/db');
const DishRepository = require('../../Domain/dishRepository');

class MySQLDishAdapter extends DishRepository {
	constructor() {
		super();
		this.pool = db.pool;
	}

	async postDish(dish) {
		const query = 'INSERT INTO `dish` (nombre, descripcion, precio, categoria, disponible) VALUES (?, ?, ?, ?, ?)';
		try {
			const result = await db.executePreparedQuery(query, [
				dish.nombre,
				dish.descripcion,
				dish.precio,
				dish.categoria,
				dish.disponible ? 1 : 0
			]);
			const insertId = result && (result.insertId || result.insert_id || (result.affectedRows ? result.insertId : null));
			if (insertId) {
				return {
					dishID: insertId,
					nombre: dish.nombre,
					descripcion: dish.descripcion,
					precio: dish.precio,
					categoria: dish.categoria,
					disponible: dish.disponible
				};
			}
			return result;
		} catch (err) {
			throw new Error('Error executing insert into dish: ' + err.message);
		}
	}

	async getDishes() {
		const query = 'SELECT * FROM `dish`';
		try {
			const rows = await db.fetchRows(query);
			return rows;
		} catch (err) {
			throw new Error('Error fetching dishes: ' + err.message);
		}
	}

	async getDishById(id) {
		const query = 'SELECT * FROM `dish` WHERE dishID = ?';
		try {
			const rows = await db.executePreparedQuery(query, [id]);
			return rows && rows[0];
		} catch (err) {
			throw new Error('Error fetching dish by ID: ' + err.message);
		}
	}

	async putDish(id, dishData) {
		const query = 'UPDATE `dish` SET nombre = ?, descripcion = ?, precio = ?, categoria = ?, disponible = ? WHERE dishID = ?';
		try {
			const disponibleVal = dishData.disponible !== undefined ? (dishData.disponible ? 1 : 0) : 1;
			const result = await db.executePreparedQuery(query, [
				dishData.nombre,
				dishData.descripcion,
				dishData.precio,
				dishData.categoria,
				disponibleVal,
				id
			]);
			return result;
		} catch (err) {
			throw new Error('Error updating dish: ' + err.message);
		}
	}

	async deleteDish(id) {
		const query = 'DELETE FROM `dish` WHERE dishID = ?';
		try {
			const result = await db.executePreparedQuery(query, [id]);
			return result;
		} catch (err) {
			throw new Error('Error deleting dish: ' + err.message);
		}
	}
}

module.exports = MySQLDishAdapter;
