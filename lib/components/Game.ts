export const ID = "game";

export const enum Phase {
	Play,
	Over,
}

export interface Model {
	phase: Phase;
	playerID: number | undefined;
}

export function create(): Model {
	return {
		phase: Phase.Play,
		playerID: undefined,
	};
}
