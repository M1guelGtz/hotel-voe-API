class CreatePisoHandler {
    constructor(createPisoUseCase) {
        this.createPisoUseCase = createPisoUseCase;
    }

    async handle(req, res) {
        try {
            const piso = await this.createPisoUseCase.execute(req.body);
            res.status(201).json(piso);
        } catch (err) {
            res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
}

module.exports = CreatePisoHandler;
