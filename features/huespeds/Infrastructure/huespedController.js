class HuespedController {
    constructor(
        createHuespedHandler,
        getHuespedsHandler,
        deleteHuespedHandler,
        getHuespedByIdHandler,
        putHuespedHandler,
        getHuespedByPersonaIdHandler,
        getHuespedByDocumentoIdentidadHandler,
        getHuespedByTipoDocumentoHandler,
        getHuespedByEmailHandler,
        getHuespedByTelefonoHandler
    ) {
        this.createHuesped = createHuespedHandler.handle.bind(createHuespedHandler);
        this.getHuespeds = getHuespedsHandler.handle.bind(getHuespedsHandler);
        this.deleteHuesped = deleteHuespedHandler.handle.bind(deleteHuespedHandler);
        this.getHuespedById = getHuespedByIdHandler.handle.bind(getHuespedByIdHandler);
        this.putHuesped = putHuespedHandler.handle.bind(putHuespedHandler);
        this.getHuespedByPersonaId = getHuespedByPersonaIdHandler.handle.bind(getHuespedByPersonaIdHandler);
        this.getHuespedByDocumentoIdentidad = getHuespedByDocumentoIdentidadHandler.handle.bind(getHuespedByDocumentoIdentidadHandler);
        this.getHuespedByTipoDocumento = getHuespedByTipoDocumentoHandler.handle.bind(getHuespedByTipoDocumentoHandler);
        this.getHuespedByEmail = getHuespedByEmailHandler.handle.bind(getHuespedByEmailHandler);
        this.getHuespedByTelefono = getHuespedByTelefonoHandler.handle.bind(getHuespedByTelefonoHandler);
    }
}

module.exports = HuespedController;