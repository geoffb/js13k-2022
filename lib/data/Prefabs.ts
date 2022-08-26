import * as Body from "../components/Body";
import * as Collider from "../components/Collider";
import * as Sprite from "../components/Sprite";
import * as Transform from "../components/Transform";
import * as Hazard from "../components/Hazard";
import * as Mortal from "../components/Mortal";
import * as Mobile from "../components/Mobile";
import * as Thrower from "../components/Thrower";

export type Model = Record<string, unknown>;

export const registry: Record<string, Model> = {
	hero: {
		[Transform.ID]: Transform.create(),
		[Body.ID]: Body.create(),
		[Collider.ID]: Collider.create(5, 0, 3),
		[Mortal.ID]: Mortal.create(),
		[Mobile.ID]: Mobile.create(80),
		[Thrower.ID]: Thrower.create("sword", 16),
		[Sprite.ID]: Sprite.create(0),
	},
	sword: {
		[Transform.ID]: Transform.create(),
		[Body.ID]: Body.create(0, 0),
		[Collider.ID]: Collider.create(3),
		[Hazard.ID]: Hazard.create(),
		[Sprite.ID]: Sprite.create(4),
	},
	axe: {
		[Transform.ID]: Transform.create(),
		[Body.ID]: Body.create(0, 0, Math.PI / 300),
		[Collider.ID]: Collider.create(5),
		[Hazard.ID]: Hazard.create(),
		[Sprite.ID]: Sprite.create(5),
	},
	cyclops: {
		[Transform.ID]: Transform.create(),
		[Body.ID]: Body.create(),
		[Collider.ID]: Collider.create(5, 0, 3),
		[Mobile.ID]: Mobile.create(32),
		[Mortal.ID]: Mortal.create(),
		[Sprite.ID]: Sprite.create(1),
	},
};
