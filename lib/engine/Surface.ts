export interface Model {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
}

export function create(width = 0, height = 0): Model {
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (ctx === null) {
		throw new Error("Invalid context");
	}
	ctx.imageSmoothingEnabled = false;
	const model = { canvas, ctx };
	reset(model);
	return model;
}

export function reset(model: Model): void {
	model.ctx.resetTransform();
	model.ctx.clearRect(0, 0, model.canvas.width, model.canvas.height);
}
