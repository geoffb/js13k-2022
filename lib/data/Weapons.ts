export interface Model {
	prefabID: string;
	speed: number;
	cooldown: number;
	rotate?: boolean;
}

export const registry: Record<string, Model> = {
	sword: {
		prefabID: "sword",
		speed: 200,
		cooldown: 300,
		rotate: true,
	},
	axe: {
		prefabID: "axe",
		speed: 80,
		cooldown: 800,
	},
};
