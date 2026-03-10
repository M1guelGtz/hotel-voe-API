class RegisterHandler {
    constructor(registerUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
    }

    async handle(req, res) {
        const { name, username, password, role_id } = req.body;

        // Validar que vengan campos requeridos
        if (!name || !username || !password) {
            return res.status(400).json({ message: 'Los campos name, username y password son requeridos' });
        }

        try {
            const employee = await this.registerUserUseCase.execute(name, username, password, role_id || 1);
            return res.status(201).json({ message: 'Usuario registrado exitosamente', employee });
        } catch (err) {
            return res.status(err.statusCode || 400).json({ message: err.message });
        }
    }
}

module.exports = RegisterHandler;