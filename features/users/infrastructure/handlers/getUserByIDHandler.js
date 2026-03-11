class GetUserByIDHandler {
    constructor(getUsersByIdUseCase) {
        this.getUsersByIdUseCase = getUsersByIdUseCase;
    }

    async handle(req, res, next) {
        const { id } = req.params;
        try {
            const employee = await this.getUsersByIdUseCase.execute(id);
            res.status(200).json({ employee });
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}   

module.exports = GetUserByIDHandler;