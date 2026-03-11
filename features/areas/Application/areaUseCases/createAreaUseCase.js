const Area = require('../../Domain/area');

class CreateAreaUseCase {
	constructor(areaRepository) {
		this.areaRepository = areaRepository;
	}

	async execute(areaData) {
		const roleId = Number(areaData.role_id);
		if (!Number.isInteger(roleId) || roleId <= 0) {
			const err = new Error('role_id es requerido y debe ser un entero válido');
			err.statusCode = 400;
			throw err;
		}

		if (!areaData || typeof areaData.name !== 'string' || areaData.name.trim() === '') {
			const err = new Error('name es requerido y debe ser un texto no vacío');
			err.statusCode = 400;
			throw err;
		}

		let color = areaData.color ?? null;
		if (color !== null) {
			color = String(color).trim();
			if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
				const err = new Error('color debe ser un hex válido como #e05c2a');
				err.statusCode = 400;
				throw err;
			}
		}

		const icon = areaData.icon !== undefined && areaData.icon !== null ? String(areaData.icon).trim() : null;
		if (icon && icon.length > 10) {
			const err = new Error('icon no debe exceder 10 caracteres');
			err.statusCode = 400;
			throw err;
		}

		const area = new Area({
			role_id: roleId,
			name: areaData.name.trim(),
			icon: icon || null,
			color,
			is_active: areaData.is_active !== undefined ? !!areaData.is_active : true
		});

		return this.areaRepository.createArea(area);
	}
}

module.exports = CreateAreaUseCase;
