const RoleRepository = require('../../Domain/roleRepository');

class InMemoryRoleAdapter extends RoleRepository {
	constructor() {
		super();
		this.roles = [
			{ id: 1, name: 'admin', description: 'Administrador', created_at: new Date() },
			{ id: 2, name: 'mesero', description: 'Atención a mesa', created_at: new Date() }
		];
		this.nextId = 3;
	}

	async createRole(roleData) {
		const exists = this.roles.find(r => r.name.toLowerCase() === roleData.name.toLowerCase());
		if (exists) {
			const err = new Error('El nombre del rol ya existe');
			err.statusCode = 409;
			throw err;
		}
		const role = {
			id: this.nextId++,
			name: roleData.name,
			description: roleData.description ?? null,
			created_at: new Date()
		};
		this.roles.push(role);
		return { ...role };
	}

	async getRoles() {
		return this.roles.map(r => ({ ...r }));
	}

	async getRoleById(id) {
		const role = this.roles.find(r => r.id === Number(id));
		return role ? { ...role } : null;
	}

	async putRole(id, roleData) {
		const index = this.roles.findIndex(r => r.id === Number(id));
		if (index === -1) return null;

		if (roleData.name !== undefined) {
			const exists = this.roles.find(r => r.id !== Number(id) && r.name.toLowerCase() === roleData.name.toLowerCase());
			if (exists) {
				const err = new Error('El nombre del rol ya existe');
				err.statusCode = 409;
				throw err;
			}
			this.roles[index].name = roleData.name;
		}

		if (roleData.description !== undefined) {
			this.roles[index].description = roleData.description;
		}

		return { ...this.roles[index] };
	}

	async deleteRole(id) {
		const index = this.roles.findIndex(r => r.id === Number(id));
		if (index === -1) return { deleted: false, id: Number(id) };
		this.roles.splice(index, 1);
		return { deleted: true, id: Number(id) };
	}
}

module.exports = InMemoryRoleAdapter;
