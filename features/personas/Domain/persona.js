class Persona {
    constructor(personaID, nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, telefono, direccion) {
        this.personaID = personaID;
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.direccion = direccion;
    }
}

module.exports = Persona;