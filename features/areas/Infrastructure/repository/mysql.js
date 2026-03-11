const db = require('../../../../core/db');
const AreaRepository = require('../../Domain/areaRepository');

class MySQLAreaAdapter extends AreaRepository {
	constructor() {
		super();
		this.pool = db.pool;
	}

	async createArea(areaData) {
		try {
			const roleQuery = 'SELECT id FROM roles WHERE id = ?';
			const roleRows = await db.executePreparedQuery(roleQuery, [areaData.role_id]);
			if (!roleRows || !roleRows[0]) {
				const err = new Error('El role_id especificado no existe');
				err.statusCode = 400;
				throw err;
			}

			const query = 'INSERT INTO areas (role_id, name, icon, color, is_active) VALUES (?, ?, ?, ?, ?)';
			const result = await db.executePreparedQuery(query, [
				areaData.role_id,
				areaData.name,
				areaData.icon,
				areaData.color,
				areaData.is_active ? 1 : 0
			]);

			return {
				id: result.insertId,
				role_id: areaData.role_id,
				name: areaData.name,
				icon: areaData.icon,
				color: areaData.color,
				is_active: !!areaData.is_active
			};
		} catch (err) {
			if (err && err.code === 'ER_DUP_ENTRY') {
				const duplicateError = new Error('El nombre del área ya existe');
				duplicateError.statusCode = 409;
				throw duplicateError;
			}
			if (err && err.statusCode) throw err;
			throw new Error('Error al crear área: ' + err.message);
		}
	}

	async getAreas() {
		const query = `
			SELECT
				a.id,
				a.role_id,
				r.name AS role,
				a.name,
				a.icon,
				a.color,
				a.is_active,
				a.created_at
			FROM areas a
			JOIN roles r ON r.id = a.role_id
			ORDER BY a.name ASC
		`;
		try {
			return await db.fetchRows(query);
		} catch (err) {
			throw new Error('Error al obtener áreas: ' + err.message);
		}
	}

	async getAreaById(id) {
		const query = `
			SELECT
				a.id,
				a.role_id,
				r.name AS role,
				a.name,
				a.icon,
				a.color,
				a.is_active,
				a.created_at
			FROM areas a
			JOIN roles r ON r.id = a.role_id
			WHERE a.id = ?
		`;
		try {
			const rows = await db.executePreparedQuery(query, [id]);
			return rows && rows[0] ? rows[0] : null;
		} catch (err) {
			throw new Error('Error al obtener área por ID: ' + err.message);
		}
	}

	async putArea(id, areaData) {
		try {
			const roleQuery = 'SELECT id FROM roles WHERE id = ?';
			const roleRows = await db.executePreparedQuery(roleQuery, [areaData.role_id]);
			if (!roleRows || !roleRows[0]) {
				const err = new Error('El role_id especificado no existe');
				err.statusCode = 400;
				throw err;
			}

			const query = 'UPDATE areas SET role_id = ?, name = ?, icon = ?, color = ?, is_active = ? WHERE id = ?';
			await db.executePreparedQuery(query, [
				areaData.role_id,
				areaData.name,
				areaData.icon,
				areaData.color,
				areaData.is_active ? 1 : 0,
				id
			]);

			return {
				id: Number(id),
				role_id: areaData.role_id,
				name: areaData.name,
				icon: areaData.icon,
				color: areaData.color,
				is_active: !!areaData.is_active
			};
		} catch (err) {
			if (err && err.code === 'ER_DUP_ENTRY') {
				const duplicateError = new Error('El nombre del área ya existe');
				duplicateError.statusCode = 409;
				throw duplicateError;
			}
			if (err && err.statusCode) throw err;
			throw new Error('Error al actualizar área: ' + err.message);
		}
	}

	async deleteArea(id) {
		const query = 'DELETE FROM areas WHERE id = ?';
		try {
			const result = await db.executePreparedQuery(query, [id]);
			return {
				deleted: !!(result && result.affectedRows),
				id: Number(id)
			};
		} catch (err) {
			throw new Error('Error al eliminar área: ' + err.message);
		}
	}
}

module.exports = MySQLAreaAdapter;
