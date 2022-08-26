export const ID = "sprite";

export interface Model {
	sheetID: string;
	index: number;
}

export function create(sheetID: string, index = 0): Model {
	return {
		sheetID,
		index,
	};
}
