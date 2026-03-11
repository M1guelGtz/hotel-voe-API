class Area {
	id;
	role_id;
	name;
	icon;
	color;
	is_active;
	created_at;

	constructor({ id, role_id, name, icon = null, color = null, is_active = true, created_at }) {
		this.id = id;
		this.role_id = role_id;
		this.name = name;
		this.icon = icon;
		this.color = color;
		this.is_active = is_active;
		this.created_at = created_at;
	}
}

module.exports = Area;
