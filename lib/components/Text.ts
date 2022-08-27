export const ID = "text";

export interface Model {
	value: string;
}

export function create(value: string): Model {
	return {
		value,
	};
}
