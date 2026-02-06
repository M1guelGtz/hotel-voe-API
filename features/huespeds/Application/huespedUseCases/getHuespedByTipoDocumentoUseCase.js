class GetHuespedByTipoDocumentoUseCase {
    constructor({ huespedRepository }) {
        this.huespedRepository = huespedRepository;
    }

    async execute(tipoDocumento) {
        return await this.huespedRepository.getByTipoDocumento(tipoDocumento);
    }
}

module.exports = GetHuespedByTipoDocumentoUseCase;