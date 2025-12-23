class GetPisoByNombreUseCase {
    constructor({ pisoRepository }) {
        this.pisoRepository = pisoRepository;
    }

    async execute(nombre) {
        const piso = await this.pisoRepository.getPisoByNombre(nombre);
        if (!piso) {
            const err = new Error(`Piso with nombre ${nombre} not found`);
            err.statusCode = 404;
            throw err;
        }
        return { piso };
    }
}

module.exports = GetPisoByNombreUseCase;
