class GetHuespedByTelefonoHandler {
    constructor(getHuespedByTelefonoUseCase) {
        this.getHuespedByTelefonoUseCase = getHuespedByTelefonoUseCase;
    }

    async handle(req, res) {
        try {
            const { telefono } = req.params;
            const huespeds = await this.getHuespedByTelefonoUseCase.execute(telefono);
            res.status(200).json(huespeds);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetHuespedByTelefonoHandler;