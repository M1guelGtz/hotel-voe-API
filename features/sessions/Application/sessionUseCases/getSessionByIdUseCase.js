class GetSessionByIdUseCase {
  constructor(sessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async execute(id) {
    if (!id) {
      const err = new Error('Session id is required');
      err.statusCode = 400;
      throw err;
    }

    const session = await this.sessionRepository.findById(id);
    if (!session) {
      const err = new Error('Session not found');
      err.statusCode = 404;
      throw err;
    }

    return session;
  }
}

module.exports = GetSessionByIdUseCase;
