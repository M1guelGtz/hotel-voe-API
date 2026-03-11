class PutTableUseCase {
	constructor({ tableRepository }) {
		this.tableRepository = tableRepository;
	}

	async execute(id, tableData) {
		const current = await this.tableRepository.getTableById(id);
		if (!current) {
			const err = new Error(`Mesa con ID ${id} no encontrada`);
			err.statusCode = 404;
			throw err;
		}

		if (!tableData || Object.keys(tableData).length === 0) {
			const err = new Error('Debes enviar al menos un campo para actualizar');
			err.statusCode = 400;
			throw err;
		}

		if (tableData.number !== undefined) {
			const num = Number(tableData.number);
			if (!Number.isInteger(num) || num <= 0 || num > 65535) {
				const err = new Error('number debe ser un entero entre 1 y 65535');
				err.statusCode = 400;
				throw err;
			}
		}

		if (tableData.capacity !== undefined) {
			const cap = Number(tableData.capacity);
			if (!Number.isInteger(cap) || cap <= 0 || cap > 255) {
				const err = new Error('capacity debe ser un entero entre 1 y 255');
				err.statusCode = 400;
				throw err;
			}
		}

		if (tableData.is_active !== undefined && typeof tableData.is_active !== 'boolean') {
			const err = new Error('is_active debe ser un booleano');
			err.statusCode = 400;
			throw err;
		}

		return this.tableRepository.putTable(id, tableData);
	}
}

module.exports = PutTableUseCase;
