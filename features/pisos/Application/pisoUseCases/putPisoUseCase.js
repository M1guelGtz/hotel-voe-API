class PutPisoUseCase {
    constructor({ pisoRepository }) {
        this.pisoRepository = pisoRepository;
    }

    async execute(id, pisoData) {
        if (!pisoData || typeof pisoData.numero !== 'number' || !pisoData.hotelID) {
            const err = new Error('numero and hotelID are required');
            err.statusCode = 400;
            throw err;
        }
        return this.pisoRepository.putPiso(id, pisoData);
    }
}

module.exports = PutPisoUseCase;
