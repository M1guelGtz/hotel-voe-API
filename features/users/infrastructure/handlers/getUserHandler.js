class GetEmployeesHandler {
    constructor(getProductUseCase) {
        this.getProductUseCase = getProductUseCase;
    }

    async handle(req, res) {
        

        try {
            const employees = await this.getProductUseCase.execute();
            return res.status(200).json({ employees });
        } catch (err) {
            return res.status(err.statusCode || 500).json({ message: err.message });
        }
    }
}
module.exports = GetEmployeesHandler;
