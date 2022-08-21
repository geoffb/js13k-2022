export const ID = "space";

export interface Model {
	width: number;
	height: number;
	cellWidth: number;
	cellHeight: number;
	cells: number[][];
}

export function create(
	width: number,
	height: number,
	cellWidth: number,
	cellHeight: number
): Model {
	const cells: number[][] = [];
	return {
		width,
		height,
		cellWidth,
		cellHeight,
		cells,
	};
}
