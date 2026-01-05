class GetPisosByActivoHandler {
    constructor(getPisosByActivoUseCase) {
        this.getPisosByActivoUseCase = getPisosByActivoUseCase;
    }

    async handle(req, res) {
        try {
            const pisos = await this.getPisosByActivoUseCase.execute();
            res.status(200).json(pisos);
        } catch (err) {
            res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
}

module.exports = GetPisosByActivoHandler;
