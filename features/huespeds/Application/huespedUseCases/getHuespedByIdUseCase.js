class GetHuespedByIdUseCase {
    constructor({ huespedRepository }) {
        this.huespedRepository = huespedRepository;
    }

    async execute(huespedID) {
        return await this.huespedRepository.getById(huespedID);
    }
}

module.exports = GetHuespedByIdUseCase;