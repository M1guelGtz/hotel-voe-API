const Role = require('../../Domain/role');

class CreateRoleUseCase {
	constructor(roleRepository) {
		this.roleRepository = roleRepository;
	}

	async execute(roleData) {
		if (!roleData || typeof roleData.name !== 'string' || roleData.name.trim() === '') {
			const err = new Error('name es requerido y debe ser un texto no vacío');
			err.statusCode = 400;
			throw err;
		}

		if (roleData.description !== undefined && roleData.description !== null && typeof roleData.description !== 'string') {
			const err = new Error('description debe ser texto o null');
			err.statusCode = 400;
			throw err;
		}

		const role = new Role({
			name: roleData.name.trim(),
			description: roleData.description !== undefined ? roleData.description : null
		});

		return this.roleRepository.createRole(role);
	}
}

module.exports = CreateRoleUseCase;
