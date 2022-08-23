import * as Body from "../components/Body";
import * as Collider from "../components/Collider";
import * as Sprite from "../components/Sprite";
import * as Transform from "../components/Transform";
import * as Hazard from "../components/Hazard";
import * as Mortal from "../components/Mortal";

export type Model = Record<string, unknown>;

export const registry: Record<string, Model> = {
	axe: {
		[Transform.ID]: Transform.create(),
		[Body.ID]: Body.create(0, 0, Math.PI / 300),
		[Collider.ID]: Collider.create(5),
		[Hazard.ID]: Hazard.create(),
		[Sprite.ID]: Sprite.create(0),
	},
	cyclops: {
		[Transform.ID]: Transform.create(),
		[Body.ID]: Body.create(),
		[Collider.ID]: Collider.create(5, 0, 2),
		[Mortal.ID]: Mortal.create(),
		[Sprite.ID]: Sprite.create(1),
	},
};
