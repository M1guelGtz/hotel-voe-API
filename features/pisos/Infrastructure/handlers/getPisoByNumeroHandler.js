class GetPisoByNumeroHandler {
    constructor(getPisoByNumeroUseCase) {
        this.getPisoByNumeroUseCase = getPisoByNumeroUseCase;
    }

    async handle(req, res) {
        try {
            const piso = await this.getPisoByNumeroUseCase.execute(req.params.numero);
            res.status(200).json(piso);
        } catch (err) {
            res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
}

module.exports = GetPisoByNumeroHandler;
