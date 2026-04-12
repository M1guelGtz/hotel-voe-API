class SessionsController {
  constructor(createSessionHandler, getSessionsHandler, getSessionByIdHandler, closeSessionHandler) {
    this.createSessionHandler = createSessionHandler;
    this.getSessionsHandler = getSessionsHandler;
    this.getSessionByIdHandler = getSessionByIdHandler;
    this.closeSessionHandler = closeSessionHandler;
  }

  createSession(req, res) {
    return this.createSessionHandler.handle(req, res);
  }

  getSessions(req, res) {
    return this.getSessionsHandler.handle(req, res);
  }

  getSessionById(req, res) {
    return this.getSessionByIdHandler.handle(req, res);
  }

  closeSession(req, res) {
    return this.closeSessionHandler.handle(req, res);
  }
}

module.exports = SessionsController;
