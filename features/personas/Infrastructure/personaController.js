class PersonaController {
    constructor(
        createPersonaHandler,
        getPersonasHandler,
        deletePersonaHandler,
        getPersonaByIdHandler,
        putPersonaHandler,
        getPersonaByNombreApellidoHandler,
        getPersonaByApellidoMaternoHandler,
        getPersonaByFechaNacimientoHandler,
        getPersonaByTelefonoHandler,
        getPersonaByDireccionHandler
    ) {
        this.createPersona = createPersonaHandler.handle.bind(createPersonaHandler);
        this.getPersonas = getPersonasHandler.handle.bind(getPersonasHandler);
        this.deletePersona = deletePersonaHandler.handle.bind(deletePersonaHandler);
        this.getPersonaById = getPersonaByIdHandler.handle.bind(getPersonaByIdHandler);
        this.putPersona = putPersonaHandler.handle.bind(putPersonaHandler);
        this.getPersonaByNombreApellido = getPersonaByNombreApellidoHandler.handle.bind(getPersonaByNombreApellidoHandler);
        this.getPersonaByApellidoMaterno = getPersonaByApellidoMaternoHandler.handle.bind(getPersonaByApellidoMaternoHandler);
        this.getPersonaByFechaNacimiento = getPersonaByFechaNacimientoHandler.handle.bind(getPersonaByFechaNacimientoHandler);
        this.getPersonaByTelefono = getPersonaByTelefonoHandler.handle.bind(getPersonaByTelefonoHandler);
        this.getPersonaByDireccion = getPersonaByDireccionHandler.handle.bind(getPersonaByDireccionHandler);
    }
}

module.exports = PersonaController;