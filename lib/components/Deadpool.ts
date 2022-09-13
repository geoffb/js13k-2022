export const ID = "deadpool";

export interface Model {
	entities: number[];
}

export function create(): Model {
	return {
		entities: [],
	};
}

export function add(model: Model, id: number): void {
	model.entities.push(id);
}

export function clear(model: Model): void {
	model.entities.length = 0;
}
