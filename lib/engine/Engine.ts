export type System = (model: Model) => void;

export interface Model {
	lastTime: number;
	deltaTime: number;
	systems: System[];
}

export function create(): Model {
	return {
		lastTime: 0,
		deltaTime: 0,
		systems: [],
	};
}

export function update(model: Model, now: number): void {
	model.deltaTime = now - model.lastTime;
	model.lastTime = now;
	for (const system of model.systems) {
		system(model);
	}
}
