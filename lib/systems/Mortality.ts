import * as Deadpool from "../components/Deadpool";
import * as Mortal from "../components/Mortal";
import * as Transform from "../components/Transform";
import * as Engine from "../engine/Engine";

export default function (engine: Engine.Model): void {
	const mortals = Engine.getComponents<Mortal.Model>(engine, Mortal.ID);
	if (mortals === undefined) {
		return;
	}

	const deadpool = Engine.getComponent<Deadpool.Model>(
		engine,
		Engine.GlobalEntityID,
		Deadpool.ID
	);

	for (const [id, mortal] of mortals) {
		if (mortal.health <= 0) {
			console.debug(`${id} died`);
			if (mortal.corpse !== undefined) {
				const transform = Engine.getComponent<Transform.Model>(
					engine,
					id,
					Transform.ID
				);
				const spawnID = Engine.spawnPrefab(engine, mortal.corpse);
				const spawnTransform = Engine.getComponent<Transform.Model>(
					engine,
					spawnID,
					Transform.ID
				);
				spawnTransform.x = transform.x;
				spawnTransform.y = transform.y;
			}
			Deadpool.add(deadpool, id);
		}
	}
}
