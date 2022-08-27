export const ID = "body";

export interface Model {
	vx: number;
	vy: number;
	av: number;
	mass: number;
}

export function create(mass = 1, vx = 0, vy = 0, av = 0): Model {
	return {
		vx,
		vy,
		av,
		mass,
	};
}
