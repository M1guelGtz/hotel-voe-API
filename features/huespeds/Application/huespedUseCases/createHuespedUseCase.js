const Huesped = require('../../Domain/huesped');

class CreateHuespedUseCase {
    constructor(huespedRepository) {
        this.huespedRepository = huespedRepository;
    }

    async execute(huespedData) {
        const huesped = new Huesped(null, huespedData.personaID, huespedData.documentoIdentidad, huespedData.tipoDocumento, huespedData.email, huespedData.telefono);
        return await this.huespedRepository.create(huesped);
    }
}

module.exports = CreateHuespedUseCase;