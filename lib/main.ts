import * as Engine from "./engine/Engine";
import * as Images from "./engine/Images";
import CollisionDetection from "./systems/CollisionDetection";
import Hazardous from "./systems/Hazard";
import Mobility from "./systems/Mobility";
import Mortality from "./systems/Mortality";
import Input from "./systems/Input";
import Physics from "./systems/Physics";
import Render from "./systems/Render";
import Throwing from "./systems/Throwing";
import RenderDebug from "./systems/RenderDebug";
import Setup from "./systems/Setup";
import MonsterAI from "./systems/MonsterAI";

async function main(): Promise<void> {
	const engine = Engine.create(512, 256);

	// Handle keyboard events
	window.addEventListener("keydown", (ev) => Engine.onKeyDown(engine, ev.key));
	window.addEventListener("keyup", (ev) => Engine.onKeyUp(engine, ev.key));

	// Load images
	await Images.loadBatch(engine.images, ["textures.png", "tiles.png"]);

	// Initialize game
	Setup(engine);

	// Define game update systems
	engine.systems.push(
		Input,
		MonsterAI,
		Mobility,
		Throwing,
		Physics,
		CollisionDetection,
		Hazardous,
		Mortality,
		Render,
		RenderDebug
	);

	// Core game loop
	const frame = function (time: number): void {
		Engine.update(engine, time);
		requestAnimationFrame(frame);
	};

	// Start game loop
	frame(performance.now());
}

main().catch((err) => {
	console.error(`ERROR: ${err.message}`);
});
