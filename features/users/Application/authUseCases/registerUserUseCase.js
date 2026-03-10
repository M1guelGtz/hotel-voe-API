class RegisterUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(name, username, password, role_id) {
        return this.userRepository.registerUser(name, username, password, role_id);
    }
}

module.exports = RegisterUserUseCase;