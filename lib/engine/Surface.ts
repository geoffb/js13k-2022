export interface Model {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
}

export function create(width: number, height: number): Model {
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (ctx === null) {
		throw new Error("Invalid context");
	}
	ctx.imageSmoothingEnabled = false;
	return { canvas, ctx };
}
