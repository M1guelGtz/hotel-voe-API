class Habitacion {
    habitacionID;
    pisoID;
    numero;
    tipo;
    capacidad;
    precioNoche;
    activo;

    constructor({ habitacionID, pisoID, numero, tipo, capacidad, precioNoche, activo = true }) {
        this.habitacionID = habitacionID;
        this.pisoID = pisoID;
        this.numero = numero;
        this.tipo = tipo;
        this.capacidad = capacidad;
        this.precioNoche = precioNoche;
        this.activo = activo;
    }
}

module.exports = Habitacion;
