import * as Viewport from "../resources/Viewport";

export type System = (model: Model) => void;

export interface Model {
	lastTime: number;
	deltaTime: number;
	systems: System[];
	viewport: Viewport.Model;
}

export function create(): Model {
	const viewport = Viewport.create(640, 320);
	return {
		lastTime: 0,
		deltaTime: 0,
		systems: [],
		viewport,
	};
}

export function update(model: Model, now: number): void {
	model.deltaTime = now - model.lastTime;
	model.lastTime = now;
	for (const system of model.systems) {
		system(model);
	}
}
