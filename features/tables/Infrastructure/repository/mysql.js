const db = require('../../../../core/db');
const TableRepository = require('../../Domain/tableRepository');

class MySQLTableAdapter extends TableRepository {
	constructor() {
		super();
		this.pool = db.pool;
	}

	async createTable(tableData) {
		const query = 'INSERT INTO tables (number, capacity, is_active) VALUES (?, ?, ?)';
		try {
			const result = await db.executePreparedQuery(query, [
				tableData.number,
				tableData.capacity,
				tableData.is_active ? 1 : 0
			]);
			return this.getTableById(result.insertId);
		} catch (err) {
			if (err && err.code === 'ER_DUP_ENTRY') {
				const duplicateError = new Error(`Ya existe una mesa con el número ${tableData.number}`);
				duplicateError.statusCode = 409;
				throw duplicateError;
			}
			throw new Error('Error al crear mesa: ' + err.message);
		}
	}

	async getTables() {
		const query = 'SELECT id, number, capacity, is_active, created_at FROM tables ORDER BY number ASC';
		try {
			const rows = await db.fetchRows(query);
			return rows;
		} catch (err) {
			throw new Error('Error al obtener mesas: ' + err.message);
		}
	}

	async getTableById(id) {
		const query = 'SELECT id, number, capacity, is_active, created_at FROM tables WHERE id = ?';
		try {
			const rows = await db.executePreparedQuery(query, [id]);
			return rows && rows[0] ? rows[0] : null;
		} catch (err) {
			throw new Error('Error al obtener mesa por ID: ' + err.message);
		}
	}

	async putTable(id, tableData) {
		const fields = [];
		const values = [];

		if (tableData.number !== undefined) {
			fields.push('number = ?');
			values.push(Number(tableData.number));
		}
		if (tableData.capacity !== undefined) {
			fields.push('capacity = ?');
			values.push(Number(tableData.capacity));
		}
		if (tableData.is_active !== undefined) {
			fields.push('is_active = ?');
			values.push(tableData.is_active ? 1 : 0);
		}

		values.push(id);
		const query = `UPDATE tables SET ${fields.join(', ')} WHERE id = ?`;

		try {
			await db.executePreparedQuery(query, values);
			return this.getTableById(id);
		} catch (err) {
			if (err && err.code === 'ER_DUP_ENTRY') {
				const duplicateError = new Error(`Ya existe una mesa con el número ${tableData.number}`);
				duplicateError.statusCode = 409;
				throw duplicateError;
			}
			throw new Error('Error al actualizar mesa: ' + err.message);
		}
	}

	async deleteTable(id) {
		const query = 'DELETE FROM tables WHERE id = ?';
		try {
			const result = await db.executePreparedQuery(query, [id]);
			return {
				deleted: !!(result && result.affectedRows),
				id: Number(id)
			};
		} catch (err) {
			throw new Error('Error al eliminar mesa: ' + err.message);
		}
	}
}

module.exports = MySQLTableAdapter;
