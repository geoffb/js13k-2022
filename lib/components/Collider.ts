export const ID = "collider";

export interface Model {
	radius: number;
	contacts: number[];
}

export function create(): Model {
	return {
		radius: 6,
		contacts: [],
	};
}
