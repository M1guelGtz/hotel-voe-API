class GetPersonasHandler {
    constructor(getPersonasUseCase) {
        this.getPersonasUseCase = getPersonasUseCase;
    }

    async handle(req, res) {
        try {
            const personas = await this.getPersonasUseCase.execute();
            res.status(200).json(personas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetPersonasHandler;