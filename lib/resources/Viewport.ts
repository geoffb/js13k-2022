export interface Model {
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
}

function autoSize(canvas: HTMLCanvasElement): void {
	// Viewport width
	const width = window.innerWidth;
	const height = window.innerHeight;

	// Determine scale while maintaining aspect ratio
	const scale = Math.min(width / canvas.width, height / canvas.height);

	// Calculate centered position for scaled canvas
	const left = width / 2 - (canvas.width / 2) * scale;
	const top = height / 2 - (canvas.height / 2) * scale;

	// Apply styles
	canvas.style.width = `${canvas.width * scale}px`;
	canvas.style.height = `${canvas.height * scale}px`;
	canvas.style.left = `${left}px`;
	canvas.style.top = `${top}px`;
}

export function create(width: number, height: number): Model {
	// Create canvas
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	canvas.style.position = "absolute";
	document.body.appendChild(canvas);
	autoSize(canvas);
	window.addEventListener("resize", () => autoSize(canvas));

	// Create 2D context
	const context = canvas.getContext("2d");
	if (context === null) {
		throw new Error("Invalid canvas context");
	}
	context.imageSmoothingEnabled = false;

	return { canvas, context };
}
