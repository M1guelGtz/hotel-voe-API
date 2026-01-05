class HabitacionController {
    constructor(
        createHabitacionHandler,
        getHabitacionesHandler,
        deleteHabitacionHandler,
        getHabitacionByIdHandler,
        putHabitacionHandler,
        getHabitacionesByPisoIdHandler,
        getHabitacionByNumeroHandler,
        getHabitacionByTipoHandler,
        getHabitacionByCapacidadHandler,
        getHabitacionByPrecioNocheHandler,
        getHabitacionesByActivoHandler
    ) {
        this.createHabitacion = createHabitacionHandler.handle.bind(createHabitacionHandler);
        this.getHabitaciones = getHabitacionesHandler.handle.bind(getHabitacionesHandler);
        this.deleteHabitacion = deleteHabitacionHandler.handle.bind(deleteHabitacionHandler);
        this.getHabitacionById = getHabitacionByIdHandler.handle.bind(getHabitacionByIdHandler);
        this.putHabitacion = putHabitacionHandler.handle.bind(putHabitacionHandler);
        this.getHabitacionesByPisoId = getHabitacionesByPisoIdHandler.handle.bind(getHabitacionesByPisoIdHandler);
        this.getHabitacionByNumero = getHabitacionByNumeroHandler.handle.bind(getHabitacionByNumeroHandler);
        this.getHabitacionByTipo = getHabitacionByTipoHandler.handle.bind(getHabitacionByTipoHandler);
        this.getHabitacionByCapacidad = getHabitacionByCapacidadHandler.handle.bind(getHabitacionByCapacidadHandler);
        this.getHabitacionByPrecioNoche = getHabitacionByPrecioNocheHandler.handle.bind(getHabitacionByPrecioNocheHandler);
        this.getHabitacionesByActivo = getHabitacionesByActivoHandler.handle.bind(getHabitacionesByActivoHandler);
    }
}

module.exports = HabitacionController;