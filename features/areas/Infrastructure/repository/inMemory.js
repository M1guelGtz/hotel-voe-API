const AreaRepository = require('../../Domain/areaRepository');

class InMemoryAreaRepository extends AreaRepository {
	constructor() {
		super();
		this.areas = [];
		this.nextId = 1;
		this.roles = [{ id: 1, name: 'admin' }, { id: 2, name: 'staff' }];
	}

	async createArea(areaData) {
		const role = this.roles.find(r => r.id === Number(areaData.role_id));
		if (!role) {
			const err = new Error('El role_id especificado no existe');
			err.statusCode = 400;
			throw err;
		}

		const duplicate = this.areas.find(a => a.name.toLowerCase() === areaData.name.toLowerCase());
		if (duplicate) {
			const err = new Error('El nombre del área ya existe');
			err.statusCode = 409;
			throw err;
		}

		const newArea = {
			id: this.nextId++,
			role_id: Number(areaData.role_id),
			role: role.name,
			name: areaData.name,
			icon: areaData.icon || null,
			color: areaData.color || null,
			is_active: !!areaData.is_active,
			created_at: new Date().toISOString()
		};
		this.areas.push(newArea);
		return newArea;
	}

	async getAreas() {
		return this.areas.slice().sort((a, b) => a.name.localeCompare(b.name));
	}

	async getAreaById(id) {
		return this.areas.find(a => a.id == id) || null;
	}

	async putArea(id, areaData) {
		const index = this.areas.findIndex(a => a.id == id);
		if (index === -1) return null;

		const role = this.roles.find(r => r.id === Number(areaData.role_id));
		if (!role) {
			const err = new Error('El role_id especificado no existe');
			err.statusCode = 400;
			throw err;
		}

		const duplicate = this.areas.find(a => a.id != id && a.name.toLowerCase() === areaData.name.toLowerCase());
		if (duplicate) {
			const err = new Error('El nombre del área ya existe');
			err.statusCode = 409;
			throw err;
		}

		const updatedArea = {
			...this.areas[index],
			role_id: Number(areaData.role_id),
			role: role.name,
			name: areaData.name,
			icon: areaData.icon || null,
			color: areaData.color || null,
			is_active: !!areaData.is_active
		};
		this.areas[index] = updatedArea;
		return updatedArea;
	}

	async deleteArea(id) {
		const index = this.areas.findIndex(a => a.id == id);
		if (index === -1) return { deleted: false, id: Number(id) };
		this.areas.splice(index, 1);
		return { deleted: true, id: Number(id) };
	}
}

module.exports = InMemoryAreaRepository;
