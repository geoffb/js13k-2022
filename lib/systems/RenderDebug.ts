import * as Engine from "../engine/Engine";
import * as Collider from "../components/Collider";
import * as Transform from "../components/Transform";
import * as Maths from "../utils/Maths";

export default function (engine: Engine.Model): void {
	const ctx = engine.viewport.context;
	ctx.resetTransform();

	const colliders = Engine.getComponents<Collider.Model>(engine, Collider.ID);
	for (const [id, collider] of colliders) {
		const transform = Engine.getComponent<Transform.Model>(
			engine,
			id,
			Transform.ID
		);

		// Render collider
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#0f0";
		ctx.beginPath();
		ctx.arc(
			Math.round(transform.x),
			Math.round(transform.y),
			collider.radius,
			0,
			Maths.Tau
		);
		ctx.stroke();

		// Render transform position
		ctx.fillStyle = "#f0f";
		ctx.fillRect(Math.round(transform.x), Math.round(transform.y), 1, 1);
	}
}
