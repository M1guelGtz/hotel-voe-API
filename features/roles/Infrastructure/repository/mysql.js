const db = require('../../../../core/db');
const RoleRepository = require('../../Domain/roleRepository');

class MySQLRoleAdapter extends RoleRepository {
	constructor() {
		super();
		this.pool = db.pool;
	}

	async createRole(roleData) {
		const query = 'INSERT INTO roles (name, description) VALUES (?, ?)';
		try {
			const result = await db.executePreparedQuery(query, [roleData.name, roleData.description]);
			return this.getRoleById(result.insertId);
		} catch (err) {
			if (err && err.code === 'ER_DUP_ENTRY') {
				const duplicateError = new Error('El nombre del rol ya existe');
				duplicateError.statusCode = 409;
				throw duplicateError;
			}
			throw new Error('Error al crear rol: ' + err.message);
		}
	}

	async getRoles() {
		const query = 'SELECT id, name, description, created_at FROM roles ORDER BY id ASC';
		try {
			return await db.fetchRows(query);
		} catch (err) {
			throw new Error('Error al obtener roles: ' + err.message);
		}
	}

	async getRoleById(id) {
		const query = 'SELECT id, name, description, created_at FROM roles WHERE id = ?';
		try {
			const rows = await db.executePreparedQuery(query, [id]);
			return rows && rows[0] ? rows[0] : null;
		} catch (err) {
			throw new Error('Error al obtener rol por ID: ' + err.message);
		}
	}

	async putRole(id, roleData) {
		const current = await this.getRoleById(id);
		if (!current) return null;

		const nextName = roleData.name !== undefined ? roleData.name.trim() : current.name;
		const nextDescription = roleData.description !== undefined ? roleData.description : current.description;

		const query = 'UPDATE roles SET name = ?, description = ? WHERE id = ?';
		try {
			await db.executePreparedQuery(query, [nextName, nextDescription, id]);
			return this.getRoleById(id);
		} catch (err) {
			if (err && err.code === 'ER_DUP_ENTRY') {
				const duplicateError = new Error('El nombre del rol ya existe');
				duplicateError.statusCode = 409;
				throw duplicateError;
			}
			throw new Error('Error al actualizar rol: ' + err.message);
		}
	}

	async deleteRole(id) {
		const query = 'DELETE FROM roles WHERE id = ?';
		try {
			const result = await db.executePreparedQuery(query, [id]);
			return {
				deleted: !!(result && result.affectedRows),
				id: Number(id)
			};
		} catch (err) {
			throw new Error('Error al eliminar rol: ' + err.message);
		}
	}
}

module.exports = MySQLRoleAdapter;
