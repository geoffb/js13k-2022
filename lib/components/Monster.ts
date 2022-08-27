export const ID = "monster";

export interface Model {
	foo: number;
}

export function create(): Model {
	return { foo: 1 };
}
