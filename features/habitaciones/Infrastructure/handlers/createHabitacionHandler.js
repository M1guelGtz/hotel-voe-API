class CreateHabitacionHandler {
    constructor(createHabitacionUseCase) {
        this.createHabitacionUseCase = createHabitacionUseCase;
    }

    async handle(req, res) {
        try {
            const habitacionData = req.body;
            const habitacionID = await this.createHabitacionUseCase.execute(habitacionData);
            res.status(201).json({ habitacionID });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CreateHabitacionHandler;
