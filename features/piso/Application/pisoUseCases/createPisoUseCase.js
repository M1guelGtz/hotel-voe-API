const Piso = require('../../Domain/piso');

class CreatePisoUseCase {
    constructor(pisoRepository) {
        this.pisoRepository = pisoRepository;
    }

    execute(pisoData) {
        if (!pisoData || typeof pisoData.numero !== 'number' || !pisoData.hotelID) {
            const err = new Error('`numero` and `hotelID` are required');
            err.statusCode = 400;
            throw err;
        }
        const piso = new Piso({
            hotelID: pisoData.hotelID,
            numero: pisoData.numero,
            nombre: pisoData.nombre,
            activo: pisoData.activo !== undefined ? pisoData.activo : true
        });
        if (typeof this.pisoRepository.postPisos === 'function') {
            return this.pisoRepository.postPisos(piso);
        }
        throw new Error('Repository does not implement a known save/post method');
    }
}

module.exports = CreatePisoUseCase;
