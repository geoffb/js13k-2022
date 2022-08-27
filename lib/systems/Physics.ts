import * as Engine from "../engine/Engine";
import * as Body from "../components/Body";
import * as Transform from "../components/Transform";

export default function (engine: Engine.Model): void {
	const bodies = Engine.getComponents<Body.Model>(engine, Body.ID);
	if (bodies === undefined) {
		return;
	}

	for (const [id, body] of bodies) {
		const transform = Engine.getComponent<Transform.Model>(
			engine,
			id,
			Transform.ID
		);

		if (body.vx * body.vx + body.vy * body.vy < 300) {
			body.vx = 0;
			body.vy = 0;
		}

		transform.x += (body.vx / 1000) * engine.deltaTime;
		transform.y += (body.vy / 1000) * engine.deltaTime;
		if (body.av !== 0) {
			transform.r += body.av * engine.deltaTime;
		}
		if (body.mass > 0) {
			const drag = 1 - (1 / 1000) * body.mass * 10;
			body.vx *= drag;
			body.vy *= drag;
		}
	}
}
