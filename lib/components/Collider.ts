export const ID = "collider";

export interface Model {
	radius: number;
}

export function create(): Model {
	return { radius: 6 };
}
