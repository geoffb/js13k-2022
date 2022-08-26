import * as Trig from "./Trig";

export interface Model {
	x: number;
	y: number;
}

export function create(x = 0, y = 0): Model {
	return { x, y };
}

export function clone(vec2: Model): Model {
	return create(vec2.x, vec2.y);
}

export function copy(model: Model, vec2: Model): void {
	model.x = vec2.x;
	model.y = vec2.y;
}

export function set(model: Model, x: number, y: number): void {
	model.x = x;
	model.y = y;
}

export function setAngle(model: Model, angle: number): void {
	set(model, Math.cos(angle), Math.sin(angle));
}

export function getAngle(model: Model): number {
	return Trig.angle(model.x, model.y);
}

export function getMagnitude(model: Model): number {
	return Math.sqrt(model.x * model.x + model.y * model.y);
}

export function scale(model: Model, scalar: number): void {
	model.x *= scalar;
	model.y *= scalar;
}

export function add(model: Model, vec2: Model): void {
	model.x += vec2.x;
	model.y += vec2.y;
}

export function normalize(model: Model): void {
	const mag = getMagnitude(model);
	if (mag !== 0) {
		return scale(model, 1 / mag);
	}
}
