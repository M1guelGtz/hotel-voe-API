class GetRoleByIdUseCase {
	constructor({ roleRepository }) {
		this.roleRepository = roleRepository;
	}

	async execute(id) {
		const role = await this.roleRepository.getRoleById(id);
		if (!role) {
			const err = new Error(`Role con ID ${id} no encontrado`);
			err.statusCode = 404;
			throw err;
		}
		return { role };
	}
}

module.exports = GetRoleByIdUseCase;
