class GetRolesUseCase {
	constructor(roleRepository) {
		this.roleRepository = roleRepository;
	}

	async execute() {
		return this.roleRepository.getRoles();
	}
}

module.exports = GetRolesUseCase;
