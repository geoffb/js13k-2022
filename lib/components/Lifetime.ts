export const ID = "lifetime";

export interface Model {
	duration: number;
	elapsed: number;
}

export function create(duration: number): Model {
	return {
		duration,
		elapsed: 0,
	};
}
