import * as Body from "../components/Body";
import * as Game from "../components/Game";
import * as Space from "../components/Space";
import * as Transform from "../components/Transform";
import * as Engine from "../engine/Engine";

export default function (engine: Engine.Model): void {
	Engine.addComponent(
		engine,
		Engine.GlobalEntityID,
		Space.ID,
		Space.create(Math.floor(512 / 32), Math.floor(256 / 32), 32, 32)
	);

	const game = Engine.addComponent(
		engine,
		Engine.GlobalEntityID,
		Game.ID,
		Game.create()
	);

	const heroID = Engine.spawnPrefab(engine, "hero");
	const heroTransform = Engine.getComponent<Transform.Model>(
		engine,
		heroID,
		Transform.ID
	);
	heroTransform.x = 64;
	heroTransform.y = 16;

	game.playerID = heroID;

	const clopsID = Engine.spawnPrefab(engine, "cyclops");
	const clopsTransform = Engine.getComponent<Transform.Model>(
		engine,
		clopsID,
		Transform.ID
	);
	clopsTransform.x = 128;
	clopsTransform.y = 64;
}
