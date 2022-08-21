export const ID = "sprite";

export interface Model {
	index: number;
}

export function create(): Model {
	return {
		index: 0,
	};
}
