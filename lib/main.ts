import * as Engine from "./engine/Engine";
import * as Images from "./engine/Images";
import CollisionDetection from "./systems/CollisionDetection";
import DeadpoolPurge from "./systems/DeadpoolPurge";
import Director from "./systems/Director";
import Hazardous from "./systems/Hazard";
import Input from "./systems/Input";
import Lifetime from "./systems/Lifetime";
import Mobility from "./systems/Mobility";
import MonsterAI from "./systems/MonsterAI";
import Mortality from "./systems/Mortality";
import Physics from "./systems/Physics";
import Render from "./systems/Render";
import RenderDebug from "./systems/RenderDebug";
import Setup from "./systems/Setup";
import Throwing from "./systems/Throwing";

async function main(): Promise<void> {
	const engine = Engine.create(512, 256);

	// Handle keyboard events
	window.addEventListener("keydown", (ev) => Engine.onKeyDown(engine, ev.key));
	window.addEventListener("keyup", (ev) => Engine.onKeyUp(engine, ev.key));

	// Load images
	await Images.loadBatch(engine.images, [
		"textures.png",
		"tiles.png",
		"font.png",
	]);

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
		Lifetime,
		Director,
		DeadpoolPurge,
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
