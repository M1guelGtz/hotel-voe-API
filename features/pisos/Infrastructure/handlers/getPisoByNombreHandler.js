class GetPisoByNombreHandler {
    constructor(getPisoByNombreUseCase) {
        this.getPisoByNombreUseCase = getPisoByNombreUseCase;
    }

    async handle(req, res) {
        try {
            const piso = await this.getPisoByNombreUseCase.execute(req.params.nombre);
            res.status(200).json(piso);
        } catch (err) {
            res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
}

module.exports = GetPisoByNombreHandler;
