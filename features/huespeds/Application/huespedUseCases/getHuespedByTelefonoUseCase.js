class GetHuespedByTelefonoUseCase {
    constructor({ huespedRepository }) {
        this.huespedRepository = huespedRepository;
    }

    async execute(telefono) {
        return await this.huespedRepository.getByTelefono(telefono);
    }
}

module.exports = GetHuespedByTelefonoUseCase;