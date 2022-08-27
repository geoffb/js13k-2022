import * as Engine from "../engine/Engine";
import * as Game from "../components/Game";
import * as Mobile from "../components/Mobile";
import * as Thrower from "../components/Thrower";

export default function (engine: Engine.Model): void {
	const game = Engine.getComponent<Game.Model>(
		engine,
		Engine.GlobalEntityID,
		Game.ID
	);

	if (game.playerID === undefined) {
		return;
	}

	const playerMobile = Engine.getComponent<Mobile.Model>(
		engine,
		game.playerID,
		Mobile.ID
	);

	playerMobile.dx = 0;
	playerMobile.dy = 0;

	if (Engine.isKeyDown(engine, "w")) {
		playerMobile.dy = -1;
	}
	if (Engine.isKeyDown(engine, "a")) {
		playerMobile.dx = -1;
	}
	if (Engine.isKeyDown(engine, "s")) {
		playerMobile.dy = 1;
	}
	if (Engine.isKeyDown(engine, "d")) {
		playerMobile.dx = 1;
	}

	const playerThrower = Engine.getComponent<Thrower.Model>(
		engine,
		game.playerID,
		Thrower.ID
	);

	playerThrower.dx = 0;
	playerThrower.dy = 0;

	if (Engine.isKeyDown(engine, "ArrowUp")) {
		playerThrower.dy -= 1;
	}
	if (Engine.isKeyDown(engine, "ArrowLeft")) {
		playerThrower.dx -= 1;
	}
	if (Engine.isKeyDown(engine, "ArrowDown")) {
		playerThrower.dy += 1;
	}
	if (Engine.isKeyDown(engine, "ArrowRight")) {
		playerThrower.dx += 1;
	}
}
