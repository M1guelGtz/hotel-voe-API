class GetPersonaByFechaNacimientoHandler {
    constructor(getPersonaByFechaNacimientoUseCase) {
        this.getPersonaByFechaNacimientoUseCase = getPersonaByFechaNacimientoUseCase;
    }

    async handle(req, res) {
        try {
            const fechaNacimiento = req.query.fechaNacimiento;
            const personas = await this.getPersonaByFechaNacimientoUseCase.execute(fechaNacimiento);
            res.status(200).json(personas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetPersonaByFechaNacimientoHandler;