export const ID = "body";

export interface Model {
	vx: number;
	vy: number;
}

export function create(): Model {
	return {
		vx: 0,
		vy: 0,
	};
}
