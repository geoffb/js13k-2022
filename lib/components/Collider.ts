export const ID = "collider";

export interface Model {
	radius: number;
	ox: number;
	oy: number;
	contacts: number[];
}

export function create(radius = 6, ox = 0, oy = 0): Model {
	return {
		radius,
		ox,
		oy,
		contacts: [],
	};
}
