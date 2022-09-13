export const ID = "mortal";

export interface Model {
	health: number;
	corpse?: string;
}

export function create(health = 1, corpse?: string): Model {
	return {
		health,
		corpse,
	};
}
