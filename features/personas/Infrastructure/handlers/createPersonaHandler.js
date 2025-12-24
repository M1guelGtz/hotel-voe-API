class CreatePersonaHandler {
    constructor(createPersonaUseCase) {
        this.createPersonaUseCase = createPersonaUseCase;
    }

    async handle(req, res) {
        try {
            const personaData = req.body;
            const personaID = await this.createPersonaUseCase.execute(personaData);
            res.status(201).json({ personaID });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CreatePersonaHandler;