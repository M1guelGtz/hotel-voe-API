class Habitacion {
    constructor(habitacionID, pisoID, numero, tipo, capacidad, precioNoche, activo) {
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