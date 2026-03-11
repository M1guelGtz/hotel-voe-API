class DeleteRoleUseCase {
	constructor({ roleRepository }) {
		this.roleRepository = roleRepository;
	}

	async execute(id) {
		const current = await this.roleRepository.getRoleById(id);
		if (!current) {
			const err = new Error(`Role con ID ${id} no encontrado`);
			err.statusCode = 404;
			throw err;
		}

		return this.roleRepository.deleteRole(id);
	}
}

module.exports = DeleteRoleUseCase;
