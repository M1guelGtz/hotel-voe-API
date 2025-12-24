class DeleteHuespedUseCase {
    constructor({ huespedRepository }) {
        this.huespedRepository = huespedRepository;
    }

    async execute(huespedID) {
        return await this.huespedRepository.delete(huespedID);
    }
}

module.exports = DeleteHuespedUseCase;