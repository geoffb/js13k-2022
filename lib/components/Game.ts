export const ID = "game";

export interface Model {
	playerID: number;
}

export function create(): Model {
	return {
		playerID: 0,
	};
}
