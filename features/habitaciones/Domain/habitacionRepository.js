class HabitacionRepository {
    async createHabitacion(habitacion) {
        throw new Error('createHabitacion method must be implemented');
    }

    async getHabitaciones() {
        throw new Error('getHabitaciones method must be implemented');
    }

    async getHabitacionById(id) {
        throw new Error('getHabitacionById method must be implemented');
    }

    async getHabitacionesByPiso(pisoID) {
        throw new Error('getHabitacionesByPiso method must be implemented');
    }

    async getHabitacionesByTipo(tipo) {
        throw new Error('getHabitacionesByTipo method must be implemented');
    }

    async getHabitacionesByActivo() {
        throw new Error('getHabitacionesByActivo method must be implemented');
    }

    async updateHabitacion(id, habitacionData) {
        throw new Error('updateHabitacion method must be implemented');
    }

    async deleteHabitacion(id) {
        throw new Error('deleteHabitacion method must be implemented');
    }

    async getHabitacionByNumero(numero) {
        throw new Error('getHabitacionByNumero method must be implemented');
    }
}

module.exports = HabitacionRepository;
