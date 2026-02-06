class GetHuespedByEmailUseCase {
    constructor({ huespedRepository }) {
        this.huespedRepository = huespedRepository;
    }

    async execute(email) {
        return await this.huespedRepository.getByEmail(email);
    }
}

module.exports = GetHuespedByEmailUseCase;