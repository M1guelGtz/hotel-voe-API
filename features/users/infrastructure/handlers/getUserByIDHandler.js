class getUserByIDHandler {
    constructor(getUsersByIdUseCase) {
        this.getUsersByIdUseCase = getUsersByIdUseCase;
    }

    async handle(req, res, next) {
        const { id } = req.params;
        try {
            const user = await this.getUsersByIdUseCase.execute(id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}   

module.exports = getUserByIDHandler;