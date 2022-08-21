import * as Body from "../components/Body";
import * as Collider from "../components/Collider";
import * as Sprite from "../components/Sprite";
import * as Transform from "../components/Transform";

export type Model = Record<string, unknown>;

export const registry: Record<string, Model> = {
	player: {
		[Transform.ID]: Transform.create(),
		[Body.ID]: Body.create(),
		[Collider.ID]: Collider.create(),
		[Sprite.ID]: Sprite.create(),
	},
};
