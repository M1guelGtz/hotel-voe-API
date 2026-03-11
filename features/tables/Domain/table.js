class Table {
	id;
	number;
	capacity;
	is_active;
	created_at;

	constructor({ id, number, capacity = 4, is_active = true, created_at }) {
		this.id = id;
		this.number = number;
		this.capacity = capacity;
		this.is_active = is_active;
		this.created_at = created_at;
	}
}

module.exports = Table;
