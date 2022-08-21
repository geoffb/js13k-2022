export const ID = "mortal";

export interface Model {
	health: number;
}

export function create(health = 1): Model {
	return {
		health,
	};
}
