class PutPisoHandler {
    constructor(putPisoUseCase) {
        this.putPisoUseCase = putPisoUseCase;
    }

    async handle(req, res) {
        try {
            const piso = await this.putPisoUseCase.execute(req.params.id, req.body);
            res.status(200).json(piso);
        } catch (err) {
            res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
}

module.exports = PutPisoHandler;
