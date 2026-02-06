class PutDishUseCase {
    constructor({ dishRepository }) {
        this.dishRepository = dishRepository;
    }

    async execute(id, dishData) {
        if (!dishData || typeof dishData.nombre !== 'string' || dishData.nombre.trim() === '') {
            const err = new Error('`nombre` is required and must be a non-empty string');
            err.statusCode = 400;
            throw err;
        }
        const precio = Number(dishData.precio);
        if (!Number.isFinite(precio)) {
            const err = new Error('`precio` is required and must be a valid number');
            err.statusCode = 400;
            throw err;
        }
        return this.dishRepository.putDish(id, dishData);
    }
}

module.exports = PutDishUseCase;
