class GetPersonaByApellidoMaternoHandler {
    constructor(getPersonaByApellidoMaternoUseCase) {
        this.getPersonaByApellidoMaternoUseCase = getPersonaByApellidoMaternoUseCase;
    }

    async handle(req, res) {
        try {
            const { apellidoMaterno } = req.params;
            const personas = await this.getPersonaByApellidoMaternoUseCase.execute(apellidoMaterno);
            res.status(200).json(personas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetPersonaByApellidoMaternoHandler;