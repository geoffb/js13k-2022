import * as Engine from "../engine/Engine";
import * as Mobile from "../components/Mobile";
import * as Transform from "../components/Transform";
import * as Monster from "../components/Monster";
import * as Thrower from "../components/Thrower";
import * as Game from "../components/Game";
import * as Trig from "../math/Trig";

export default function (engine: Engine.Model): void {
	const monsters = Engine.getComponents<Mobile.Model>(engine, Monster.ID);
	if (monsters === undefined) {
		return;
	}

	const game = Engine.getComponent<Game.Model>(
		engine,
		Engine.GlobalEntityID,
		Game.ID
	);

	let targetTransform: Transform.Model | undefined;
	if (game.playerID !== undefined) {
		targetTransform = Engine.getComponent<Transform.Model>(
			engine,
			game.playerID,
			Transform.ID
		);
	}

	for (const [id] of monsters) {
		const transform = Engine.getComponent<Transform.Model>(
			engine,
			id,
			Transform.ID
		);
		const mobile = Engine.getComponent<Mobile.Model>(engine, id, Mobile.ID);
		const thrower = Engine.getComponent<Thrower.Model>(engine, id, Thrower.ID);
		if (targetTransform !== undefined) {
			const angle = Trig.angle(
				targetTransform.x - transform.x,
				targetTransform.y - transform.y
			);
			const cos = Math.cos(angle);
			const sin = Math.sin(angle);
			mobile.dx = cos;
			mobile.dy = sin;
			thrower.dx = cos;
			thrower.dy = sin;
		} else {
			mobile.dx = 0;
			mobile.dy = 0;
			thrower.dx = 0;
			thrower.dy = 0;
		}
	}
}
