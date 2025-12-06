class HotelController {
    constructor(createController, getController, deleteController, getByIdController, putController, getByNombreController, getByDireccionController, getByEmailController, getByTelefonoController, getByActivoController) {
        this.createController = createController;
        this.getController = getController;
        this.putController = putController;
        this.deleteController = deleteController;
        this.getByIdController = getByIdController;
        this.getByNombreController = getByNombreController;
        this.getByDireccionController = getByDireccionController;
        this.getByEmailController = getByEmailController;
        this.getByTelefonoController = getByTelefonoController;
        this.getByActivoController = getByActivoController;
    }

    createHotel(req, res) {
        return this.createController.handle(req, res);
    }

    getHotels(req, res) {
        return this.getController.handle(req, res);
    }

    getHotelsByActivo(req, res) {
        return this.getByActivoController.handle(req, res);
    }

    getHotelById(req, res) {
        return this.getByIdController.handle(req, res);
    }

    getHotelByNombre(req, res) {
        return this.getByNombreController.handle(req, res);
    }

    getHotelByDireccion(req, res) {
        return this.getByDireccionController.handle(req, res);
    }

    getHotelByEmail(req, res) {
        return this.getByEmailController.handle(req, res);
    }

    getHotelByTelefono(req, res) {
        return this.getByTelefonoController.handle(req, res);
    }

    putHotel(req, res) {
        return this.putController.handle(req, res);
    }

    deleteHotel(req, res) {
        return this.deleteController.handle(req, res);
    }
}

module.exports = HotelController;
