export const ID = "hazard";

export interface Model {
	damage: number;
	knockback?: number;
}

export function create(damage = 1, knockback?: number): Model {
	return {
		damage,
		knockback,
	};
}
