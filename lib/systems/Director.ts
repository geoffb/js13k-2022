import * as Engine from "../engine/Engine";
import * as Game from "../components/Game";
import * as Mortal from "../components/Mortal";
import * as Text from "../components/Text";
import * as Transform from "../components/Transform";

function setText(engine: Engine.Model, entityID: number, value: string): void {
	const text = Engine.getComponent<Text.Model>(engine, entityID, Text.ID);
	text.value = value;
}

function setVisibility(
	engine: Engine.Model,
	entityID: number,
	visible: boolean
): void {
	const transform = Engine.getComponent<Transform.Model>(
		engine,
		entityID,
		Transform.ID
	);
	transform.v = visible;
}

function showMessage(
	engine: Engine.Model,
	game: Game.Model,
	mainValue: string,
	subValue: string
): void {
	const mainID = game.handles["main"];
	if (mainID !== undefined) {
		setText(engine, mainID, mainValue);
		setVisibility(engine, mainID, true);
	}
	const subID = game.handles["sub"];
	if (subID !== undefined) {
		setText(engine, subID, subValue);
		setVisibility(engine, subID, true);
	}
}

function triggerGameOver(engine: Engine.Model, game: Game.Model): void {
	game.playerID = undefined;
	showMessage(engine, game, "GAME OVER", "PRESS ANY KEY");
	game.phase = Game.Phase.Over;
}

function play(engine: Engine.Model, game: Game.Model): void {
	if (game.playerID === undefined) {
		triggerGameOver(engine, game);
		return;
	}

	const playerMortal = Engine.getComponent<Mortal.Model>(
		engine,
		game.playerID,
		Mortal.ID
	);
	if (playerMortal === undefined || playerMortal.health <= 0) {
		triggerGameOver(engine, game);
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
