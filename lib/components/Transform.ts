export const ID = "transform";

export interface Model {
	x: number;
	y: number;
	r: number;
}

export function create(): Model {
	return {
		x: 0,
		y: 0,
		r: 0,
	};
}
