import * as Engine from "./engine/Engine";
import * as Images from "./engine/Images";
import * as Body from "./components/Body";
import * as Transform from "./components/Transform";
import Physics from "./systems/Physics";
import Render from "./systems/Render";
import RenderDebug from "./systems/RenderDebug";

async function main(): Promise<void> {
	const engine = Engine.create(512, 256);

	await Images.loadBatch(engine.images, ["textures.png"]);

	engine.systems.push(Physics, Render, RenderDebug);

	const frame = function (time: number): void {
		Engine.update(engine, time);
		requestAnimationFrame(frame);
	};

	const playerID = Engine.spawnPrefab(engine, "player");
	const transform = Engine.getComponent<Transform.Model>(
		engine,
		playerID,
		Transform.ID
	);
	transform.x = 64;
	transform.y = 64;
	const body = Engine.getComponent<Body.Model>(engine, playerID, Body.ID);
	body.vx = 32;
	body.vy = 32;

	frame(performance.now());
}

main().catch((err) => {
	console.error(`ERROR: ${err.message}`);
});
