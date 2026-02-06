class GetHuespedByIdHandler {
    constructor(getHuespedByIdUseCase) {
        this.getHuespedByIdUseCase = getHuespedByIdUseCase;
    }

    async handle(req, res) {
        try {
            const { id } = req.params;
            const huesped = await this.getHuespedByIdUseCase.execute(id);
            if (!huesped) {
                return res.status(404).json({ error: 'Huesped not found' });
            }
            res.status(200).json(huesped);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetHuespedByIdHandler;