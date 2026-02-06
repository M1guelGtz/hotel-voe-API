class Piso {
    pisoID;
    hotelID;
    numero;
    nombre;
    activo;
    constructor({ pisoID, hotelID, numero, nombre, activo = true }) {
        this.pisoID = pisoID;
        this.hotelID = hotelID;
        this.numero = numero;
        this.nombre = nombre;
        this.activo = activo;
    }
}

module.exports = Piso;
