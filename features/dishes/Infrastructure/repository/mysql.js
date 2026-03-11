const db = require('../../../../core/db');
const DishRepository = require('../../Domain/dishRepository');

class MySQLDishAdapter extends DishRepository {
	constructor() {
		super();
		this.pool = db.pool;
	}

	async createProduct(productData) {
		try {
			// 1. Verificar que el área exista
			const areaQuery = `SELECT id FROM areas WHERE id = ?`;
			const area = await db.executePreparedQuery(areaQuery, [productData.area_id]);
			if (!area || !area[0]) throw new Error('El área especificada no existe');

			// 2. Verificar que la categoría exista (si se manda)
			if (productData.category_id) {
				const categoryQuery = `SELECT id FROM categories WHERE id = ?`;
				const category = await db.executePreparedQuery(categoryQuery, [productData.category_id]);
				if (!category || !category[0]) throw new Error('La categoría especificada no existe');
			}

			// 3. Insertar el producto
			const insertQuery = `
				INSERT INTO products (name, description, price, area_id, category_id, image_url)
				VALUES (?, ?, ?, ?, ?, ?)
			`;
			const result = await db.executePreparedQuery(insertQuery, [
				productData.name,
				productData.description,
				productData.price,
				productData.area_id,
				productData.category_id,
				productData.image_url
			]);

			// 4. Regresar el producto creado
			return {
				id: result.insertId,
				name: productData.name,
				description: productData.description,
				price: productData.price,
				area_id: productData.area_id,
				category_id: productData.category_id,
				image_url: productData.image_url
			};
		} catch (err) {
			throw new Error('Error al crear producto: ' + err.message);
		}
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
