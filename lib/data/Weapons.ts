export interface Model {
	prefabID: string;
	speed: number;
	cooldown: number;
	rotate?: boolean;
}

export const registry: Record<string, Model> = {
	sword: {
		prefabID: "sword",
		speed: 150,
		cooldown: 400,
		rotate: true,
	},
	axe: {
		prefabID: "axe",
		speed: 80,
		cooldown: 800,
	},
};
