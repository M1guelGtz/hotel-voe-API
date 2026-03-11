class PutRoleUseCase {
	constructor({ roleRepository }) {
		this.roleRepository = roleRepository;
	}

	async execute(id, roleData) {
		const current = await this.roleRepository.getRoleById(id);
		if (!current) {
			const err = new Error(`Role con ID ${id} no encontrado`);
			err.statusCode = 404;
			throw err;
		}

		if (!roleData || Object.keys(roleData).length === 0) {
			const err = new Error('Debes enviar al menos un campo para actualizar');
			err.statusCode = 400;
			throw err;
		}

		if (roleData.name !== undefined) {
			if (typeof roleData.name !== 'string' || roleData.name.trim() === '') {
				const err = new Error('name debe ser un texto no vacío');
				err.statusCode = 400;
				throw err;
			}
		}

		if (roleData.description !== undefined && roleData.description !== null && typeof roleData.description !== 'string') {
			const err = new Error('description debe ser texto o null');
			err.statusCode = 400;
			throw err;
		}

		return this.roleRepository.putRole(id, roleData);
	}
}

module.exports = PutRoleUseCase;
