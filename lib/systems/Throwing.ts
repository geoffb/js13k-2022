import * as Engine from "../engine/Engine";
import * as Body from "../components/Body";
import * as Thrower from "../components/Thrower";
import * as Transform from "../components/Transform";
import * as Weapons from "../data/Weapons";
import * as Trig from "../math/Trig";
import * as Vec2 from "../math/Vec2";

const tempAngle = Vec2.create();

export default function (engine: Engine.Model): void {
	const throwers = Engine.getComponents<Thrower.Model>(engine, Thrower.ID);
	if (throwers === undefined) {
		return;
	}

	for (const [id, thrower] of throwers) {
		// Reduce thrower cooldown
		if (thrower.cooldown > 0) {
			thrower.cooldown = Math.max(thrower.cooldown - engine.deltaTime, 0);
			continue;
		}

		// Ensure the thrower is attempting to throw
		if (thrower.dx === 0 && thrower.dy === 0) {
			continue;
		}

		const weapon = Weapons.registry[thrower.weaponID];

		// Set thrower cooldown
		thrower.cooldown = weapon.cooldown;

		const transform = Engine.getComponent<Transform.Model>(
			engine,
			id,
			Transform.ID
		);

		const angle = Trig.angle(thrower.dx, thrower.dy);
		Vec2.setAngle(tempAngle, angle);

		const spawnID = Engine.spawnPrefab(engine, weapon.prefabID);

		const spawnTransform = Engine.getComponent<Transform.Model>(
			engine,
			spawnID,
			Transform.ID
		);
		spawnTransform.x = transform.x + tempAngle.x * thrower.distance;
		spawnTransform.y = transform.y + tempAngle.y * thrower.distance;

		if (weapon.rotate) {
			spawnTransform.r = angle;
		}

		const spawnBody = Engine.getComponent<Body.Model>(engine, spawnID, Body.ID);
		spawnBody.vx = tempAngle.x * weapon.speed;
		spawnBody.vy = tempAngle.y * weapon.speed;
	}
}
