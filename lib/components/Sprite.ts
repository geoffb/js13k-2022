export const ID = "sprite";

export interface Model {
	index: number;
	layer: number;
}

export function create(index = 0, layer = 0): Model {
	return {
		index,
		layer,
	};
}
