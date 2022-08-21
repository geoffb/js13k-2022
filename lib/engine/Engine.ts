import * as Viewport from "./Viewport";
import * as Images from "./Images";
import * as Prefabs from "../data/Prefabs";

export type System = (model: Model) => void;

export type ComponentEntry<T = unknown> = [number, T];

export interface ComponentGroup<T = unknown> {
	list: ComponentEntry<T>[];
	lookup: Record<number, T>;
}

export interface Model {
	lastTime: number;
	deltaTime: number;
	systems: System[];
	viewport: Viewport.Model;
	images: Images.Model;
	nextEntityID: number;
	components: Record<string, ComponentGroup>;
}

export function create(width: number, height: number): Model {
	const viewport = Viewport.create(width, height);
	const images = Images.create();
	return {
		lastTime: 0,
		deltaTime: 0,
		systems: [],
		viewport,
		images,
		nextEntityID: 1,
		components: {},
	};
}

export function update(model: Model, now: number): void {
	model.deltaTime = now - model.lastTime;
	model.lastTime = now;
	for (const system of model.systems) {
		system(model);
	}
}

export function createEntity(model: Model): number {
	return model.nextEntityID++;
}

export function addComponent(
	model: Model,
	entityID: number,
	componentID: string,
	componentData: unknown
): void {
	let group = model.components[componentID];
	if (group === undefined) {
		group = model.components[componentID] = {
			list: [],
			lookup: {},
		};
	}
	group.list.push([entityID, componentData]);
	group.lookup[entityID] = componentData;
}

export function getComponent<T>(
	model: Model,
	entityID: number,
	componentID: string
): T {
	const group = model.components[componentID];
	return group.lookup[entityID] as T;
}

export function getComponents<T>(
	model: Model,
	componentID: string
): ComponentEntry<T>[] {
	const group = model.components[componentID];
	return group.list as ComponentEntry<T>[];
}

export function spawnPrefab(model: Model, prefabID: string): number {
	const prefab = Prefabs.registry[prefabID];
	const entityID = createEntity(model);
	for (const componentID in prefab) {
		addComponent(
			model,
			entityID,
			componentID,
			structuredClone(prefab[componentID])
		);
	}
	return entityID;
}
