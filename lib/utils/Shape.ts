export const enum Type {
	Rectangle,
	Circle,
	Star,
}

/** Rectangle: x, y, width, height */
export type Rectangle = [number, number, number, number];

/** Circle: x, y, radius */
export type Circle = [number, number, number];

/** Star: x, y, radius, rayCount, rayLength, rayWidth */
export type Star = [number, number, number, number, number, number];

function drawRect(
	ctx: CanvasRenderingContext2D,
	data: Rectangle,
	scale: number,
	fill = true,
	stroke = false
): void {
	if (fill !== undefined) {
		ctx.fillRect(
			data[0] * scale,
			data[1] * scale,
			data[2] * scale,
			data[3] * scale
		);
	}
	if (stroke) {
		ctx.strokeRect(
			data[0] * scale,
			data[1] * scale,
			data[2] * scale,
			data[3] * scale
		);
	}
}

function addCirclePath(
	ctx: CanvasRenderingContext2D,
	data: Circle,
	scale: number
): void {
	ctx.arc(data[0] * scale, data[1] * scale, data[2] * scale, 0, Math.PI * 2);
}

function addStarPath(
	ctx: CanvasRenderingContext2D,
	data: Star,
	scale: number
): void {
	// TODO: Create a star
}

export function draw(
	ctx: CanvasRenderingContext2D,
	type: Type,
	data: number[],
	scale: number,
	fillStyle?: string,
	strokeStyle?: string,
	strokeWidth = 1
): void {
	const fill = fillStyle !== undefined;
	const stroke = strokeStyle !== undefined;
	if (fill) {
		ctx.fillStyle = fillStyle;
	}
	if (stroke) {
		ctx.strokeStyle = strokeStyle;
		ctx.lineWidth = strokeWidth;
	}
	if (type === Type.Rectangle) {
		drawRect(ctx, data as Rectangle, scale, fill, stroke);
	} else {
		ctx.beginPath();
		switch (type) {
			case Type.Circle:
				addCirclePath(ctx, data as Circle, scale);
				break;
			case Type.Star:
				addStarPath(ctx, data as Star, scale);
				break;
		}
		if (fill) {
			ctx.fill();
		}
		if (stroke) {
			ctx.stroke();
		}
	}
}
