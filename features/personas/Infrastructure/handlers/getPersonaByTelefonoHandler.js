class GetPersonaByTelefonoHandler {
    constructor(getPersonaByTelefonoUseCase) {
        this.getPersonaByTelefonoUseCase = getPersonaByTelefonoUseCase;
    }

    async handle(req, res) {
        try {
            const { telefono } = req.params;
            const personas = await this.getPersonaByTelefonoUseCase.execute(telefono);
            res.status(200).json(personas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetPersonaByTelefonoHandler;