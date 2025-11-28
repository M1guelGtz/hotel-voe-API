class LoginUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    
    async execute(email, password) {
        const user = await this.userRepository.loginUser(email, password);
        if (!user) {
            const err = new Error('Invalid email or password');
            err.statusCode = 401;
            throw err;
        }
        return user;
    }
}

module.exports = LoginUserUseCase;