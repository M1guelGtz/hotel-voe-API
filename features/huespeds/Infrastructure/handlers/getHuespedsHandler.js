class GetHuespedsHandler {
    constructor(getHuespedsUseCase) {
        this.getHuespedsUseCase = getHuespedsUseCase;
    }

    async handle(req, res) {
        try {
            const huespeds = await this.getHuespedsUseCase.execute();
            res.status(200).json(huespeds);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetHuespedsHandler;