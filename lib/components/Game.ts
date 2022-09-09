export const ID = "game";

export const enum Phase {
	Setup,
	Title,
	Play,
	Over,
}

export interface Model {
	phase: Phase;
	playerID: number | undefined;
	handles: Record<string, number | undefined>;
}

export function create(): Model {
	return {
		phase: Phase.Setup,
		playerID: undefined,
		handles: {},
	};
}
