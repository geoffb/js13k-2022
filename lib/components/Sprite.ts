export const ID = "sprite";

export interface Model {
	index: number;
}

export function create(index = 0): Model {
	return {
		index,
	};
}
