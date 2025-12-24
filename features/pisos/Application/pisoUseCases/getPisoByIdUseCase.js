class GetPisoByIdUseCase {
    constructor({ pisoRepository }) {
        this.pisoRepository = pisoRepository;
    }

    async execute(id) {
        const piso = await this.pisoRepository.getPisoById(id);
        if (!piso) {
            const err = new Error(`Piso with ID ${id} not found`);
            err.statusCode = 404;
            throw err;
        }
        return { piso };
    }
}

module.exports = GetPisoByIdUseCase;
