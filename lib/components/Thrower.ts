export const ID = "thrower";

export interface Model {
	dx: number;
	dy: number;
	distance: number;
	weaponID: string;
	cooldown: number;
}

export function create(weaponID: string, distance: number): Model {
	return {
		dx: 0,
		dy: 0,
		distance,
		weaponID,
		cooldown: 0,
	};
}
