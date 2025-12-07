const HabitacionRepository = require('../../Domain/habitacionRepository');

class InMemoryHabitacionRepository extends HabitacionRepository {
    constructor() {
        super();
        this.habitaciones = [];
        this.nextId = 1;
    }

    async createHabitacion(habitacion) {
        const newHabitacion = {
            habitacionID: this.nextId++,
            ...habitacion
        };
        this.habitaciones.push(newHabitacion);
        return newHabitacion;
    }

    async getHabitaciones() {
        return this.habitaciones;
    }

    async getHabitacionById(id) {
        return this.habitaciones.find(h => h.habitacionID == id);
    }

    async getHabitacionesByPiso(pisoID) {
        return this.habitaciones.filter(h => h.pisoID == pisoID);
    }

    async getHabitacionesByTipo(tipo) {
        return this.habitaciones.filter(h => h.tipo === tipo);
    }

    async getHabitacionesByActivo() {
        return this.habitaciones.filter(h => h.activo === true);
    }

    async updateHabitacion(id, habitacionData) {
        const habitacion = this.habitaciones.find(h => h.habitacionID == id);
        if (habitacion) {
            Object.assign(habitacion, habitacionData);
            return habitacion;
        }
        return null;
    }

    async deleteHabitacion(id) {
        const index = this.habitaciones.findIndex(h => h.habitacionID == id);
        if (index > -1) {
            this.habitaciones.splice(index, 1);
            return { message: 'Habitacion deleted successfully' };
        }
        return null;
    }

    async getHabitacionByNumero(numero) {
        return this.habitaciones.find(h => h.numero === numero);
    }
}

module.exports = InMemoryHabitacionRepository;
