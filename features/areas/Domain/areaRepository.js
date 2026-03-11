class AreaRepository {
	async createArea(areaData) {
		throw new Error('createArea method must be implemented');
	}

	async getAreas() {
		throw new Error('getAreas method must be implemented');
	}

	async getAreaById(id) {
		throw new Error('getAreaById method must be implemented');
	}

	async putArea(id, areaData) {
		throw new Error('putArea method must be implemented');
	}

	async deleteArea(id) {
		throw new Error('deleteArea method must be implemented');
	}
}

module.exports = AreaRepository;
