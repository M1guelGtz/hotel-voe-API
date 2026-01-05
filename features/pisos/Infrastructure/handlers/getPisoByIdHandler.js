class GetPisoByIdHandler {
    constructor(getPisoByIdUseCase) {
        this.getPisoByIdUseCase = getPisoByIdUseCase;
    }

    async handle(req, res) {
        try {
            const piso = await this.getPisoByIdUseCase.execute(req.params.id);
            res.status(200).json(piso);
        } catch (err) {
            res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
}

module.exports = GetPisoByIdHandler;
