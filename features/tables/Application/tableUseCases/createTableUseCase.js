class CreateTableUseCase {
	constructor(tableRepository) {
		this.tableRepository = tableRepository;
	}

	async execute(tableData) {
		const { number, capacity, is_active } = tableData;

		// Validar number
		if (number === undefined || number === null) {
			const err = new Error('number es requerido');
			err.statusCode = 400;
			throw err;
		}
		const num = Number(number);
		if (!Number.isInteger(num) || num <= 0 || num > 65535) {
			const err = new Error('number debe ser un entero entre 1 y 65535');
			err.statusCode = 400;
			throw err;
		}

		// Validar capacity
		if (capacity !== undefined) {
			const cap = Number(capacity);
			if (!Number.isInteger(cap) || cap <= 0 || cap > 255) {
				const err = new Error('capacity debe ser un entero entre 1 y 255');
				err.statusCode = 400;
				throw err;
			}
		}

		// Validar is_active
		if (is_active !== undefined && typeof is_active !== 'boolean') {
			const err = new Error('is_active debe ser un booleano');
			err.statusCode = 400;
			throw err;
		}

		return this.tableRepository.createTable({
			number: num,
			capacity: capacity !== undefined ? Number(capacity) : 4,
			is_active: is_active !== undefined ? is_active : true
		});
	}
}

module.exports = CreateTableUseCase;
