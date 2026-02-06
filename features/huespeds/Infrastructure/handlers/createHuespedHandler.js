class CreateHuespedHandler {
    constructor(createHuespedUseCase) {
        this.createHuespedUseCase = createHuespedUseCase;
    }

    async handle(req, res) {
        try {
            const huespedData = req.body;
            const huespedID = await this.createHuespedUseCase.execute(huespedData);
            res.status(201).json({ huespedID });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CreateHuespedHandler;