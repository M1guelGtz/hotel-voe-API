class Huesped {
    constructor(huespedID, personaID, documentoIdentidad, tipoDocumento, email, telefono) {
        this.huespedID = huespedID;
        this.personaID = personaID;
        this.documentoIdentidad = documentoIdentidad;
        this.tipoDocumento = tipoDocumento;
        this.email = email;
        this.telefono = telefono;
    }
}

module.exports = Huesped;