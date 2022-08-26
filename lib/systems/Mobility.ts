import * as Engine from "../engine/Engine";
import * as Mobile from "../components/Mobile";
import * as Transform from "../components/Transform";

export default function (engine: Engine.Model): void {
	const mobiles = Engine.getComponents<Mobile.Model>(engine, Mobile.ID);
	if (mobiles === undefined) {
		return;
	}

	for (const [id, mobile] of mobiles) {
		const transform = Engine.getComponent<Transform.Model>(
			engine,
			id,
			Transform.ID
		);
		transform.x += ((mobile.dx * mobile.speed) / 1000) * engine.deltaTime;
		transform.y += ((mobile.dy * mobile.speed) / 1000) * engine.deltaTime;
		transform.sx = mobile.dx < 0 ? -1 : 1;
	}
}
