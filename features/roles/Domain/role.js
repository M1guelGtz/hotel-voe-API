class Role {
	id;
	name;
	description;
	created_at;

	constructor({ id, name, description = null, created_at }) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.created_at = created_at;
	}
}

module.exports = Role;
