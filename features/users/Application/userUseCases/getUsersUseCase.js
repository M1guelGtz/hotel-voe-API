class GetUsersUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute() {
        return this.userRepository.getEmployees();
    }
}

module.exports = GetUsersUseCase;
