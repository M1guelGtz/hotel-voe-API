class Category {
	id;
	name;
	sort_order;
	is_active;

	constructor({ id, name, sort_order = 0, is_active = true }) {
		this.id = id;
		this.name = name;
		this.sort_order = sort_order;
		this.is_active = is_active;
	}
}

module.exports = Category;
