class CreateDishHandler {
	constructor(createDishUseCase) {
		this.createDishUseCase = createDishUseCase;
	}

	async handle(req, res) {
		const { name, description, price, area_id, category_id } = req.body;

		if (!name || !price || !area_id) {
			return res.status(400).json({ message: 'name, price y area_id son requeridos' });
		}

		try {
			// Si hay archivo, construir la ruta relativa
			let image_url = null;
			if (req.file) {
				image_url = `/public/uploads/${req.file.filename}`;
			}

			const product = await this.createDishUseCase.execute({
				name,
				description,
				price,
				area_id,
				category_id,
				image_url
			});
			res.status(201).json({ product });
		} catch (err) {
			res.status(err.statusCode || 400).json({ message: err.message });
		}
	}
}

module.exports = CreateDishHandler;
