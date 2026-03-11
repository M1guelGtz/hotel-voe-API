class CreateDishUseCase {
    constructor(dishRepository) {
        this.dishRepository = dishRepository;
    }

    async execute(productData) {
        if (!productData || typeof productData.name !== 'string' || productData.name.trim() === '') {
            const err = new Error('name es requerido y debe ser un string no vacío');
            err.statusCode = 400;
            throw err;
        }
        const price = Number(productData.price);
        if (!Number.isFinite(price) || price <= 0) {
            const err = new Error('price es requerido y debe ser un número válido mayor a 0');
            err.statusCode = 400;
            throw err;
        }
        /*if (!Number.isInteger(productData.area_id) || productData.area_id <= 0) {
            const err = new Error('area_id es requerido y debe ser un número entero válido');
            err.statusCode = 400;
            throw err;
        }*/

        return this.dishRepository.createProduct({
            name: productData.name.trim(),
            description: productData.description || null,
            price,
            area_id: productData.area_id,
            category_id: productData.category_id || null,
            image_url: productData.image_url || null
        });
    }
}

module.exports = CreateDishUseCase;
