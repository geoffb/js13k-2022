import * as Engine from "../engine/Engine";
import * as Collider from "../components/Collider";
import * as Body from "../components/Body";
import * as Hazard from "../components/Hazard";
import * as Mortal from "../components/Mortal";
import * as Transform from "../components/Transform";
import * as Trig from "../math/Trig";

export default function (engine: Engine.Model): void {
	const hazards = Engine.getComponents<Hazard.Model>(engine, Hazard.ID);
	if (hazards === undefined) {
		return;
	}

	for (const [id, hazard] of hazards) {
		const collider = Engine.getComponent<Collider.Model>(
			engine,
			id,
			Collider.ID
		);
		const transform = Engine.getComponent<Transform.Model>(
			engine,
			id,
			Transform.ID
		);
		const hx = transform.x + collider.ox;
		const hy = transform.y + collider.oy;
		for (const contactID of collider.contacts) {
			const mortal = Engine.getComponent<Mortal.Model>(
				engine,
				contactID,
				Mortal.ID
			);
			if (mortal !== undefined) {
				mortal.health -= hazard.damage;
				if (hazard.knockback !== undefined) {
					const mortalBody = Engine.getComponent<Body.Model>(
						engine,
						contactID,
						Body.ID
					);
					if (mortalBody !== undefined) {
						const mortalTransform = Engine.getComponent<Transform.Model>(
							engine,
							contactID,
							Transform.ID
						);
						const mortalCollider = Engine.getComponent<Collider.Model>(
							engine,
							contactID,
							Collider.ID
						);
						const mx = mortalTransform.x + mortalCollider.ox;
						const my = mortalTransform.y + mortalCollider.oy;
						const angle = Trig.angle(mx - hx, my - hy);
						mortalBody.vx = Math.cos(angle) * hazard.knockback;
						mortalBody.vy = Math.sin(angle) * hazard.knockback;
					}
				}
			}
		}
	}
}
