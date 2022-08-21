export const ID = "transform";

export interface Model {
	x: number;
	y: number;
	r: number;
	sx: number;
	sy: number;
}

export function create(): Model {
	return {
		x: 0,
		y: 0,
		r: 0,
		sx: 1,
		sy: 1,
	};
}
