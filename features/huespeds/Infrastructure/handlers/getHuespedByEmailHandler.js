class GetHuespedByEmailHandler {
    constructor(getHuespedByEmailUseCase) {
        this.getHuespedByEmailUseCase = getHuespedByEmailUseCase;
    }

    async handle(req, res) {
        try {
            const email = req.query.email;
            const huespeds = await this.getHuespedByEmailUseCase.execute(email);
            res.status(200).json(huespeds);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = GetHuespedByEmailHandler;