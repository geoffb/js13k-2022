export const ID = "transform";

export interface Model {
	x: number;
	y: number;
	r: number;
	sx: number;
	sy: number;
	v: boolean;
}

export function create(
	rotation = 0,
	scaleX = 1,
	scaleY = 1,
	visible = true
): Model {
	return {
		x: 0,
		y: 0,
		r: rotation,
		sx: scaleX,
		sy: scaleY,
		v: visible,
	};
}
