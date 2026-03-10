class LoginHandler {
    constructor(loginUseCase) {
        this.loginUseCase = loginUseCase;
    }
    
    async handle (req, res) {
        const { username, password } = req.body;
        try {
            const { token, user } = await this.loginUseCase.execute(username, password);
            res.status(200).json({
                token,
                message: 'Login successful',
                userID: user.id,
                userRole: user.role,
                user,
            });
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}

module.exports = LoginHandler;