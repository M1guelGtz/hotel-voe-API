const Dish = require('../../Domain/dish');

class CreateDishUseCase {
    constructor(dishRepository) {
        this.dishRepository = dishRepository;
    }

    execute(dishData) {
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

        const dish = new Dish({
            nombre: dishData.nombre.trim(),
            descripcion: dishData.descripcion,
            precio,
            categoria: dishData.categoria,
            disponible: dishData.disponible !== undefined ? dishData.disponible : true
        });

        if (typeof this.dishRepository.postDish === 'function') {
            return this.dishRepository.postDish(dish);
        }

        throw new Error('Repository does not implement a known save/post method');
    }
}

module.exports = CreateDishUseCase;
