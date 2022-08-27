import * as Engine from "../engine/Engine";
import * as Game from "../components/Game";
import * as Mortal from "../components/Mortal";

function play(engine: Engine.Model, game: Game.Model): void {
	if (game.playerID === undefined) {
		game.playerID = undefined;
		game.phase = Game.Phase.Over;
		return;
	}

	const playerMortal = Engine.getComponent<Mortal.Model>(
		engine,
		game.playerID,
		Mortal.ID
	);
	if (playerMortal === undefined || playerMortal.health <= 0) {
		game.playerID = undefined;
		game.phase = Game.Phase.Over;
		return;
	}
}

function over(engine: Engine.Model, game: Game.Model): void {
	// TODO: What to do in over state?
}

export default function (engine: Engine.Model): void {
	const game = Engine.getComponent<Game.Model>(
		engine,
		Engine.GlobalEntityID,
		Game.ID
	);
	switch (game.phase) {
		case Game.Phase.Play:
			play(engine, game);
			break;
		case Game.Phase.Over:
			over(engine, game);
			break;
	}
}
