class PutDishUseCase {
    constructor({ dishRepository }) {
        this.dishRepository = dishRepository;
    }

    async execute(id, dishData) {
        const current = await this.dishRepository.getDishById(id);
        if (!current) {
            const err = new Error(`Product with ID ${id} not found`);
            err.statusCode = 404;
            throw err;
        }

        if (!dishData || Object.keys(dishData).length === 0) {
            const err = new Error('Debes enviar al menos un campo para actualizar');
            err.statusCode = 400;
            throw err;
        }

        if (dishData.name !== undefined && (typeof dishData.name !== 'string' || dishData.name.trim() === '')) {
            const err = new Error('name debe ser un texto no vacío');
            err.statusCode = 400;
            throw err;
        }

        if (dishData.price !== undefined) {
            const price = Number(dishData.price);
            if (!Number.isFinite(price) || price <= 0) {
                const err = new Error('price debe ser un número válido mayor a 0');
                err.statusCode = 400;
                throw err;
            }
        }

        if (dishData.area_id !== undefined) {
            const areaId = Number(dishData.area_id);
            if (!Number.isInteger(areaId) || areaId <= 0) {
                const err = new Error('area_id debe ser un entero válido');
                err.statusCode = 400;
                throw err;
            }
        }

        if (dishData.category_id !== undefined && dishData.category_id !== null) {
            const categoryId = Number(dishData.category_id);
            if (!Number.isInteger(categoryId) || categoryId <= 0) {
                const err = new Error('category_id debe ser un entero válido o null');
                err.statusCode = 400;
                throw err;
            }
        }

        return this.dishRepository.putDish(id, dishData);
    }
}

module.exports = PutDishUseCase;
