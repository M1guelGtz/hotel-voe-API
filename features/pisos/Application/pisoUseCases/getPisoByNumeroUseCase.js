class GetPisoByNumeroUseCase {
    constructor({ pisoRepository }) {
        this.pisoRepository = pisoRepository;
    }

    async execute(numero) {
        const piso = await this.pisoRepository.getPisoByNumero(numero);
        if (!piso) {
            const err = new Error(`Piso with numero ${numero} not found`);
            err.statusCode = 404;
            throw err;
        }
        return { piso };
    }
}

module.exports = GetPisoByNumeroUseCase;
