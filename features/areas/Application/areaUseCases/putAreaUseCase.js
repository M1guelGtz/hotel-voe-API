class PutAreaUseCase {
	constructor({ areaRepository }) {
		this.areaRepository = areaRepository;
	}

	async execute(id, areaData) {
		const currentArea = await this.areaRepository.getAreaById(id);
		if (!currentArea) {
			const err = new Error(`Area with ID ${id} not found`);
			err.statusCode = 404;
			throw err;
		}

		if (areaData.name !== undefined) {
			if (typeof areaData.name !== 'string' || areaData.name.trim() === '') {
				const err = new Error('name debe ser un texto no vacío');
				err.statusCode = 400;
				throw err;
			}
		}

		if (areaData.role_id !== undefined) {
			const roleId = Number(areaData.role_id);
			if (!Number.isInteger(roleId) || roleId <= 0) {
				const err = new Error('role_id debe ser un entero válido');
				err.statusCode = 400;
				throw err;
			}
		}

		if (areaData.color !== undefined && areaData.color !== null) {
			const color = String(areaData.color).trim();
			if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
				const err = new Error('color debe ser un hex válido como #e05c2a');
				err.statusCode = 400;
				throw err;
			}
		}

		if (areaData.icon !== undefined && areaData.icon !== null) {
			const icon = String(areaData.icon).trim();
			if (icon.length > 10) {
				const err = new Error('icon no debe exceder 10 caracteres');
				err.statusCode = 400;
				throw err;
			}
		}

		const payload = {
			role_id: areaData.role_id !== undefined ? Number(areaData.role_id) : currentArea.role_id,
			name: areaData.name !== undefined ? areaData.name.trim() : currentArea.name,
			icon: areaData.icon !== undefined ? (areaData.icon === null ? null : String(areaData.icon).trim()) : currentArea.icon,
			color: areaData.color !== undefined ? areaData.color : currentArea.color,
			is_active: areaData.is_active !== undefined ? !!areaData.is_active : !!currentArea.is_active
		};

		return this.areaRepository.putArea(id, payload);
	}
}

module.exports = PutAreaUseCase;
