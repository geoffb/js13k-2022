import * as Body from "./components/Body";
import * as Space from "./components/Space";
import * as Transform from "./components/Transform";
import * as Engine from "./engine/Engine";
import * as Images from "./engine/Images";
import CollisionDetection from "./systems/CollisionDetection";
import Physics from "./systems/Physics";
import Render from "./systems/Render";
import RenderDebug from "./systems/RenderDebug";
import Mortality from "./systems/Mortality";
import Hazardous from "./systems/Hazard";

async function main(): Promise<void> {
	const engine = Engine.create(512, 256);

	await Images.loadBatch(engine.images, ["textures.png"]);

	Engine.addComponent(
		engine,
		Engine.GlobalEntityID,
		Space.ID,
		Space.create(Math.floor(512 / 32), Math.floor(256 / 32), 32, 32)
	);

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
