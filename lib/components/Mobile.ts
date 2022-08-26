export const ID = "mobile";

export interface Model {
	dx: number;
	dy: number;
	speed: number;
}

export function create(speed = 1): Model {
	return {
		dx: 0,
		dy: 0,
		speed,
	};
}
