import * as Body from "./components/Body";
import * as Transform from "./components/Transform";
import * as Engine from "./engine/Engine";
import CollisionDetection from "./systems/CollisionDetection";
import Hazardous from "./systems/Hazard";
import Mortality from "./systems/Mortality";
import Physics from "./systems/Physics";
import Render from "./systems/Render";
import RenderDebug from "./systems/RenderDebug";
import Setup from "./systems/Setup";

async function main(): Promise<void> {
	const engine = Engine.create(1024, 512);

	Setup(engine);

	// Define systems
	engine.systems.push(
		Physics,
		CollisionDetection,
		Hazardous,
		Mortality,
		Render,
		RenderDebug
	);

	const frame = function (time: number): void {
		Engine.update(engine, time);
		requestAnimationFrame(frame);
	};

	const axeID = Engine.spawnPrefab(engine, "axe");
	const axeTransform = Engine.getComponent<Transform.Model>(
		engine,
		axeID,
		Transform.ID
	);
	axeTransform.x = 64;
	axeTransform.y = 72;
	const axeBody = Engine.getComponent<Body.Model>(engine, axeID, Body.ID);
	axeBody.vx = 64;
	// axeBody.vy = 32;

	const clopsID = Engine.spawnPrefab(engine, "cyclops");
	const clopsTransform = Engine.getComponent<Transform.Model>(
		engine,
		clopsID,
		Transform.ID
	);
	clopsTransform.x = 128;
	clopsTransform.y = 64;
	clopsTransform.sx = -1;
	// const body = Engine.getComponent<Body.Model>(engine, clopsID, Body.ID);
	// body.vx = 32;
	// body.vy = 32;

	frame(performance.now());
}

main().catch((err) => {
	console.error(`ERROR: ${err.message}`);
});
