import * as Engine from "../engine/Engine";
import * as Mobile from "../components/Mobile";
import * as Transform from "../components/Transform";
import * as Monster from "../components/Monster";
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

	const playerTransform = Engine.getComponent<Transform.Model>(
		engine,
		game.playerID,
		Transform.ID
	);

	for (const [id, monster] of monsters) {
		const transform = Engine.getComponent<Transform.Model>(
			engine,
			id,
			Transform.ID
		);

		const angle = Trig.angle(
			playerTransform.x - transform.x,
			playerTransform.y - transform.y
		);

		const mobile = Engine.getComponent<Mobile.Model>(engine, id, Mobile.ID);
		mobile.dx = Math.cos(angle);
		mobile.dy = Math.sin(angle);
	}
}
