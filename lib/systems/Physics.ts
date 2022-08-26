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
		transform.x += (body.vx / 1000) * engine.deltaTime;
		transform.y += (body.vy / 1000) * engine.deltaTime;
		if (body.av !== 0) {
			transform.r += body.av * engine.deltaTime;
		}
	}
}
