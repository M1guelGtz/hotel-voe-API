class HabitacionController {
    constructor(
        createHabitacionHandler,
        getHabitacionesHandler,
        deleteHabitacionHandler,
        getHabitacionByIdHandler,
        updateHabitacionHandler,
        getHabitacionesByPisoHandler,
        getHabitacionesByTipoHandler,
        getHabitacionesByActivoHandler,
        getHabitacionByNumeroHandler
    ) {
        this.createHabitacionHandler = createHabitacionHandler;
        this.getHabitacionesHandler = getHabitacionesHandler;
        this.deleteHabitacionHandler = deleteHabitacionHandler;
        this.getHabitacionByIdHandler = getHabitacionByIdHandler;
        this.updateHabitacionHandler = updateHabitacionHandler;
        this.getHabitacionesByPisoHandler = getHabitacionesByPisoHandler;
        this.getHabitacionesByTipoHandler = getHabitacionesByTipoHandler;
        this.getHabitacionesByActivoHandler = getHabitacionesByActivoHandler;
        this.getHabitacionByNumeroHandler = getHabitacionByNumeroHandler;
    }

    async createHabitacion(req, res) {
        try {
            const result = await this.createHabitacionHandler.handle(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getHabitaciones(req, res) {
        try {
            const result = await this.getHabitacionesHandler.handle();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteHabitacion(req, res) {
        try {
            const result = await this.deleteHabitacionHandler.handle(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getHabitacionById(req, res) {
        try {
            const result = await this.getHabitacionByIdHandler.handle(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateHabitacion(req, res) {
        try {
            const result = await this.updateHabitacionHandler.handle(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getHabitacionesByPiso(req, res) {
        try {
            const result = await this.getHabitacionesByPisoHandler.handle(req.params.pisoID);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getHabitacionesByTipo(req, res) {
        try {
            const result = await this.getHabitacionesByTipoHandler.handle(req.params.tipo);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getHabitacionesByActivo(req, res) {
        try {
            const result = await this.getHabitacionesByActivoHandler.handle();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getHabitacionByNumero(req, res) {
        try {
            const result = await this.getHabitacionByNumeroHandler.handle(req.params.numero);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = HabitacionController;
