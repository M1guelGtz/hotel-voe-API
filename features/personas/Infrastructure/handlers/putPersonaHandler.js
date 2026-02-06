class PutPersonaHandler {
    constructor(putPersonaUseCase) {
        this.putPersonaUseCase = putPersonaUseCase;
    }

    async handle(req, res) {
        try {
            const { id } = req.params;
            const personaData = req.body;
            await this.putPersonaUseCase.execute(id, personaData);
            res.status(200).json({ message: 'Persona updated' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PutPersonaHandler;