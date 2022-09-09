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
	// changePhase(Game.Phase.Title);
}

function changePhase(
	engine: Engine.Model,
	game: Game.Model,
	phase: Game.Phase
): void {
	Engine.resetKeys(engine);
	game.phase = phase;
}

type PhaseHandler = (engine: Engine.Model, game: Game.Model) => void;

const phaseHandlers: Record<Game.Phase, PhaseHandler> = {
	[Game.Phase.Setup]: (engine, game) => {
		showMessage(engine, game, "BLOODBATH", "PRESS ANY KEY");
		game.phase = Game.Phase.Title;
	},
	[Game.Phase.Title]: (engine, game) => {
		// TODO: Advance to Play based upon keyboard input
		game.phase = Game.Phase.Play;
	},
	[Game.Phase.Play]: (engine, game) => {
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
	},
	[Game.Phase.Over]: (engine, game) => {
		// TODO: Return to title based upon keyboard input
	},
};

export default function (engine: Engine.Model): void {
	const game = Engine.getComponent<Game.Model>(
		engine,
		Engine.GlobalEntityID,
		Game.ID
	);
	const handler = phaseHandlers[game.phase];
	handler(engine, game);
}
