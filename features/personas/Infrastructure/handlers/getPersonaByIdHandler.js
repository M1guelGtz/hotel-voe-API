class GetPersonaByIdHandler {
    constructor(getPersonaByIdUseCase) {
        this.getPersonaByIdUseCase = getPersonaByIdUseCase;
    }

    async handle(req, res) {
        try {
            const { id } = req.params;
            const persona = await this.getPersonaByIdUseCase.execute(id);
            if (!persona) {
                return res.status(404).json({ error: 'Persona not found' });
            }
            res.status(200).json(persona);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetPersonaByIdHandler;