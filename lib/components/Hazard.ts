export const ID = "hazard";

export interface Model {
	damage: number;
}

export function create(damage = 1): Model {
	return {
		damage,
	};
}
