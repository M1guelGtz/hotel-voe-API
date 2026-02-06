class GetHuespedByPersonaIdHandler {
    constructor(getHuespedByPersonaIdUseCase) {
        this.getHuespedByPersonaIdUseCase = getHuespedByPersonaIdUseCase;
    }

    async handle(req, res) {
        try {
            const { personaID } = req.params;
            const huespeds = await this.getHuespedByPersonaIdUseCase.execute(personaID);
            res.status(200).json(huespeds);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetHuespedByPersonaIdHandler;