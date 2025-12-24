class PisoController {
    constructor(createController, getController, deleteController, getByIdController, putController, getByHotelIdController, getByNumeroController, getByNombreController, getByActivoController) {
        this.createController = createController;
        this.getController = getController;
        this.putController = putController;
        this.deleteController = deleteController;
        this.getByIdController = getByIdController;
        this.getByHotelIdController = getByHotelIdController;
        this.getByNumeroController = getByNumeroController;
        this.getByNombreController = getByNombreController;
        this.getByActivoController = getByActivoController;
    }

    createPiso(req, res) {
        return this.createController.handle(req, res);
    }
    getPisos(req, res) {
        return this.getController.handle(req, res);
    }
    getPisosByActivo(req, res) {
        return this.getByActivoController.handle(req, res);
    }
    getPisoById(req, res) {
        return this.getByIdController.handle(req, res);
    }
    getPisosByHotelId(req, res) {
        return this.getByHotelIdController.handle(req, res);
    }
    getPisoByNumero(req, res) {
        return this.getByNumeroController.handle(req, res);
    }
    getPisoByNombre(req, res) {
        return this.getByNombreController.handle(req, res);
    }
    putPiso(req, res) {
        return this.putController.handle(req, res);
    }
    deletePiso(req, res) {
        return this.deleteController.handle(req, res);
    }
}

module.exports = PisoController;
