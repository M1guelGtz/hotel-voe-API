class GetSessionsUseCase {
  constructor(sessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async execute(filters = {}) {
    const sessions = await this.sessionRepository.findAll(filters);
    return sessions;
  }
}

module.exports = GetSessionsUseCase;
