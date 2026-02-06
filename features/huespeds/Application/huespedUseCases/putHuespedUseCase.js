class PutHuespedUseCase {
    constructor({ huespedRepository }) {
        this.huespedRepository = huespedRepository;
    }

    async execute(huespedID, huespedData) {
        return await this.huespedRepository.update(huespedID, huespedData);
    }
}

module.exports = PutHuespedUseCase;