import * as Body from "../components/Body";
import * as Collider from "../components/Collider";
import * as Sprite from "../components/Sprite";
import * as Transform from "../components/Transform";
import * as Hazard from "../components/Hazard";
import * as Mortal from "../components/Mortal";
import * as Mobile from "../components/Mobile";
import * as Monster from "../components/Monster";
import * as Thrower from "../components/Thrower";
import * as Text from "../components/Text";

export type Model = Record<string, unknown>;

export const registry: Record<string, Model> = {
	text1: {
		[Transform.ID]: Transform.create(0, 3, 3),
		[Text.ID]: Text.create("GAME OVER"),
	},
	text2: {
		[Transform.ID]: Transform.create(),
		[Text.ID]: Text.create("PRESS SPACEBAR"),
	},
	hero: {
		[Transform.ID]: Transform.create(),
		[Body.ID]: Body.create(10),
		[Collider.ID]: Collider.create(5, 0, 3),
		[Mortal.ID]: Mortal.create(),
		[Mobile.ID]: Mobile.create(100),
		[Thrower.ID]: Thrower.create("sword", 16),
		[Sprite.ID]: Sprite.create(0),
	},
	sword: {
		[Transform.ID]: Transform.create(),
		[Body.ID]: Body.create(0),
		[Collider.ID]: Collider.create(3),
		[Hazard.ID]: Hazard.create(1, 100),
		[Sprite.ID]: Sprite.create(4),
	},
	axe: {
		[Transform.ID]: Transform.create(),
		[Body.ID]: Body.create(1, 0, 0, Math.PI / 300),
		[Collider.ID]: Collider.create(5),
		[Hazard.ID]: Hazard.create(),
		[Sprite.ID]: Sprite.create(5),
	},
	cyclops: {
		[Transform.ID]: Transform.create(),
		[Body.ID]: Body.create(25),
		[Collider.ID]: Collider.create(5, 0, 3),
		[Mobile.ID]: Mobile.create(16),
		[Mortal.ID]: Mortal.create(30),
		[Thrower.ID]: Thrower.create("axe", 16, 5),
		[Monster.ID]: Monster.create(),
		[Sprite.ID]: Sprite.create(1),
	},
	lancer: {
		[Transform.ID]: Transform.create(),
		[Body.ID]: Body.create(10),
		[Collider.ID]: Collider.create(5, 0, 3),
		[Mobile.ID]: Mobile.create(32),
		[Mortal.ID]: Mortal.create(10),
		[Thrower.ID]: Thrower.create("sword", 16, 5),
		[Monster.ID]: Monster.create(),
		[Sprite.ID]: Sprite.create(2),
	},
};
