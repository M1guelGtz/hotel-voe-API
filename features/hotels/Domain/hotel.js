class Hotel {
    hotelID; 
    nombre; 
    direccion; 
    telefono; 
    email; 
    activo; 
    fechaRegistro;
    constructor({ hotelID, nombre, direccion, telefono, email, activo = true, fechaRegistro }) {
        this.hotelID = hotelID;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.activo = activo;
        this.fechaRegistro = fechaRegistro;
    }
}

module.exports = Hotel;
