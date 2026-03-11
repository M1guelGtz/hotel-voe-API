const TableRepository = require('../../Domain/tableRepository');

class InMemoryTableAdapter extends TableRepository {
	constructor() {
		super();
		this.tables = [
			{ id: 1, number: 1, capacity: 4, is_active: true, created_at: new Date() },
			{ id: 2, number: 2, capacity: 2, is_active: true, created_at: new Date() }
		];
		this.nextId = 3;
	}

	async createTable(tableData) {
		const exists = this.tables.find(t => t.number === tableData.number);
		if (exists) {
			const err = new Error(`Ya existe una mesa con el número ${tableData.number}`);
			err.statusCode = 409;
			throw err;
		}
		const newTable = {
			id: this.nextId++,
			number: tableData.number,
			capacity: tableData.capacity !== undefined ? tableData.capacity : 4,
			is_active: tableData.is_active !== undefined ? tableData.is_active : true,
			created_at: new Date()
		};
		this.tables.push(newTable);
		return { ...newTable };
	}

	async getTables() {
		return this.tables.map(t => ({ ...t })).sort((a, b) => a.number - b.number);
	}

	async getTableById(id) {
		const table = this.tables.find(t => t.id === Number(id));
		return table ? { ...table } : null;
	}

	async putTable(id, tableData) {
		const index = this.tables.findIndex(t => t.id === Number(id));
		if (index === -1) return null;

		if (tableData.number !== undefined) {
			const exists = this.tables.find(t => t.number === Number(tableData.number) && t.id !== Number(id));
			if (exists) {
				const err = new Error(`Ya existe una mesa con el número ${tableData.number}`);
				err.statusCode = 409;
				throw err;
			}
			this.tables[index].number = Number(tableData.number);
		}
		if (tableData.capacity !== undefined) this.tables[index].capacity = Number(tableData.capacity);
		if (tableData.is_active !== undefined) this.tables[index].is_active = tableData.is_active;

		return { ...this.tables[index] };
	}

	async deleteTable(id) {
		const index = this.tables.findIndex(t => t.id === Number(id));
		if (index === -1) return { deleted: false, id: Number(id) };
		this.tables.splice(index, 1);
		return { deleted: true, id: Number(id) };
	}
}

module.exports = InMemoryTableAdapter;
