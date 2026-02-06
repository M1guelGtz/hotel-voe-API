class DeletePersonaHandler {
    constructor(deletePersonaUseCase) {
        this.deletePersonaUseCase = deletePersonaUseCase;
    }

    async handle(req, res) {
        try {
            const { id } = req.params;
            await this.deletePersonaUseCase.execute(id);
            res.status(200).json({ message: 'Persona deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = DeletePersonaHandler;