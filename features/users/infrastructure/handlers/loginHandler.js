class LoginHandler {
    constructor(loginUseCase) {
        this.loginUseCase = loginUseCase;
    }
    
    async handle (req, res) {
        const { email, password } = req.body;
        try {
            const token = await this.loginUseCase.execute(email, password);
            res.status(200).json({ token });
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}

module.exports = LoginHandler;