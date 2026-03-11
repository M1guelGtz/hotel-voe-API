class DeleteUserHandler {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase;
    }

    async handle(req, res) {
        const { id } = req.params;
        try {
            const employee = await this.deleteUserUseCase.execute(id);
            return res.status(200).json({ message: 'Empleado deshabilitado', employee });
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}

module.exports = DeleteUserHandler;