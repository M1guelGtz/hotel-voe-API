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
		const query = `
			SELECT
				p.id,
				p.area_id,
				a.name AS area_name,
				p.category_id,
				c.name AS category_name,
				p.name,
				p.description,
				p.price,
				p.image_url,
				p.is_available,
				p.is_active,
				p.created_at,
				p.updated_at
			FROM products p
			JOIN areas a ON a.id = p.area_id
			LEFT JOIN categories c ON c.id = p.category_id
			ORDER BY p.id DESC
		`;
		try {
			const rows = await db.fetchRows(query);
			return rows;
		} catch (err) {
			throw new Error('Error fetching dishes: ' + err.message);
		}
	}

	async getDishById(id) {
		const query = `
			SELECT
				p.id,
				p.area_id,
				a.name AS area_name,
				p.category_id,
				c.name AS category_name,
				p.name,
				p.description,
				p.price,
				p.image_url,
				p.is_available,
				p.is_active,
				p.created_at,
				p.updated_at
			FROM products p
			JOIN areas a ON a.id = p.area_id
			LEFT JOIN categories c ON c.id = p.category_id
			WHERE p.id = ?
		`;
		try {
			const rows = await db.executePreparedQuery(query, [id]);
			return rows && rows[0];
		} catch (err) {
			throw new Error('Error fetching dish by ID: ' + err.message);
		}
	}

	async putDish(id, dishData) {
		try {
			const current = await this.getDishById(id);
			if (!current) return null;

			const areaId = dishData.area_id !== undefined ? Number(dishData.area_id) : current.area_id;
			const categoryId = dishData.category_id !== undefined ? dishData.category_id : current.category_id;

			const areaQuery = 'SELECT id FROM areas WHERE id = ?';
			const area = await db.executePreparedQuery(areaQuery, [areaId]);
			if (!area || !area[0]) throw new Error('El área especificada no existe');

			if (categoryId !== null && categoryId !== undefined) {
				const categoryQuery = 'SELECT id FROM categories WHERE id = ?';
				const category = await db.executePreparedQuery(categoryQuery, [categoryId]);
				if (!category || !category[0]) throw new Error('La categoría especificada no existe');
			}

			const query = `
				UPDATE products
				SET
					area_id = ?,
					category_id = ?,
					name = ?,
					description = ?,
					price = ?,
					image_url = ?,
					is_available = ?,
					is_active = ?
				WHERE id = ?
			`;

			await db.executePreparedQuery(query, [
				areaId,
				categoryId,
				dishData.name !== undefined ? dishData.name : current.name,
				dishData.description !== undefined ? dishData.description : current.description,
				dishData.price !== undefined ? Number(dishData.price) : current.price,
				dishData.image_url !== undefined ? dishData.image_url : current.image_url,
				dishData.is_available !== undefined ? (dishData.is_available ? 1 : 0) : (current.is_available ? 1 : 0),
				dishData.is_active !== undefined ? (dishData.is_active ? 1 : 0) : (current.is_active ? 1 : 0),
				id
			]);

			return this.getDishById(id);
		} catch (err) {
			throw new Error('Error updating dish: ' + err.message);
		}
	}

	async deleteDish(id) {
		const query = 'DELETE FROM products WHERE id = ?';
		try {
			const result = await db.executePreparedQuery(query, [id]);
			return { deleted: !!(result && result.affectedRows), id: Number(id) };
		} catch (err) {
			throw new Error('Error deleting dish: ' + err.message);
		}
	}
}

module.exports = MySQLDishAdapter;
