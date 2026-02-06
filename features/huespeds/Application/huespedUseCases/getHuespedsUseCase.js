class GetHuespedsUseCase {
    constructor(huespedRepository) {
        this.huespedRepository = huespedRepository;
    }

    async execute() {
        return await this.huespedRepository.getAll();
    }
}

module.exports = GetHuespedsUseCase;