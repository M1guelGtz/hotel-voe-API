class DeletePisoHandler {
    constructor(deletePisoUseCase) {
        this.deletePisoUseCase = deletePisoUseCase;
    }

    async handle(req, res) {
        try {
            const piso = await this.deletePisoUseCase.execute(req.params.id);
            res.status(200).json(piso);
        } catch (err) {
            res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
}

module.exports = DeletePisoHandler;
