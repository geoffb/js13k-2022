export const ID = "body";

export interface Model {
	vx: number;
	vy: number;
	av: number;
}

export function create(vx = 0, vy = 0, av = 0): Model {
	return {
		vx,
		vy,
		av,
	};
}
