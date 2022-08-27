export const ID = "thrower";

export interface Model {
	dx: number;
	dy: number;
	distance: number;
	weaponID: string;
	cooldown: number;
	cooldownScale: number;
}

export function create(
	weaponID: string,
	distance: number,
	cooldownScale = 1
): Model {
	return {
		dx: 0,
		dy: 0,
		distance,
		weaponID,
		cooldown: 0,
		cooldownScale,
	};
}
