const db = require('../../../../core/db');
const CategoryRepository = require('../../Domain/categoryRepository');

class MySQLCategoryAdapter extends CategoryRepository {
	constructor() {
		super();
		this.pool = db.pool;
	}

	async createCategory(categoryData) {
		const query = 'INSERT INTO categories (name, sort_order, is_active) VALUES (?, ?, ?)';
		try {
			const result = await db.executePreparedQuery(query, [
				categoryData.name,
				categoryData.sort_order,
				categoryData.is_active ? 1 : 0
			]);

			return {
				id: result.insertId,
				name: categoryData.name,
				sort_order: categoryData.sort_order,
				is_active: !!categoryData.is_active
			};
		} catch (err) {
			if (err && err.code === 'ER_DUP_ENTRY') {
				const duplicateError = new Error('La categoría ya existe');
				duplicateError.statusCode = 409;
				throw duplicateError;
			}
			throw new Error('Error al crear categoría: ' + err.message);
		}
	}

	async getCategories() {
		const query = 'SELECT id, name, sort_order, is_active FROM categories ORDER BY sort_order ASC, name ASC';
		try {
			const rows = await db.fetchRows(query);
			return rows;
		} catch (err) {
			throw new Error('Error al obtener categorías: ' + err.message);
		}
	}

	async getCategoryById(id) {
		const query = 'SELECT id, name, sort_order, is_active FROM categories WHERE id = ?';
		try {
			const rows = await db.executePreparedQuery(query, [id]);
			return rows && rows[0] ? rows[0] : null;
		} catch (err) {
			throw new Error('Error al obtener categoría por ID: ' + err.message);
		}
	}

	async putCategory(id, categoryData) {
		const query = 'UPDATE categories SET name = ?, sort_order = ?, is_active = ? WHERE id = ?';
		try {
			await db.executePreparedQuery(query, [
				categoryData.name,
				categoryData.sort_order,
				categoryData.is_active ? 1 : 0,
				id
			]);

			return {
				id: Number(id),
				name: categoryData.name,
				sort_order: categoryData.sort_order,
				is_active: !!categoryData.is_active
			};
		} catch (err) {
			if (err && err.code === 'ER_DUP_ENTRY') {
				const duplicateError = new Error('La categoría ya existe');
				duplicateError.statusCode = 409;
				throw duplicateError;
			}
			throw new Error('Error al actualizar categoría: ' + err.message);
		}
	}

	async deleteCategory(id) {
		const query = 'DELETE FROM categories WHERE id = ?';
		try {
			const result = await db.executePreparedQuery(query, [id]);
			return {
				deleted: !!(result && result.affectedRows),
				id: Number(id)
			};
		} catch (err) {
			throw new Error('Error al eliminar categoría: ' + err.message);
		}
	}
}

module.exports = MySQLCategoryAdapter;
