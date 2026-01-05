class GetPersonaByNombreApellidoHandler {
    constructor(getPersonaByNombreApellidoUseCase) {
        this.getPersonaByNombreApellidoUseCase = getPersonaByNombreApellidoUseCase;
    }

    async handle(req, res) {
        try {
            const { nombre, apellidoPaterno } = req.query;
            const personas = await this.getPersonaByNombreApellidoUseCase.execute(nombre, apellidoPaterno);
            res.status(200).json(personas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetPersonaByNombreApellidoHandler;