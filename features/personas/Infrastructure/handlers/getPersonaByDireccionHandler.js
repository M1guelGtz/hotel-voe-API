class GetPersonaByDireccionHandler {
    constructor(getPersonaByDireccionUseCase) {
        this.getPersonaByDireccionUseCase = getPersonaByDireccionUseCase;
    }

    async handle(req, res) {
        try {
            const direccion = req.query.direccion;
            const personas = await this.getPersonaByDireccionUseCase.execute(direccion);
            res.status(200).json(personas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetPersonaByDireccionHandler;