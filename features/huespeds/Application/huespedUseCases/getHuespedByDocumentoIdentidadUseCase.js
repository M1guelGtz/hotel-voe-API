class GetHuespedByDocumentoIdentidadUseCase {
    constructor({ huespedRepository }) {
        this.huespedRepository = huespedRepository;
    }

    async execute(documentoIdentidad) {
        return await this.huespedRepository.getByDocumentoIdentidad(documentoIdentidad);
    }
}

module.exports = GetHuespedByDocumentoIdentidadUseCase;