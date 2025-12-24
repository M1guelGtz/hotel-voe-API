class GetPisosHandler {
    constructor(getPisosUseCase) {
        this.getPisosUseCase = getPisosUseCase;
    }

    async handle(req, res) {
        try {
            const pisos = await this.getPisosUseCase.execute();
            res.status(200).json(pisos);
        } catch (err) {
            res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
}

module.exports = GetPisosHandler;
