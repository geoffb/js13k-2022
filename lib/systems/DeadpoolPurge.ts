import * as Deadpool from "../components/Deadpool";
import * as Engine from "../engine/Engine";

export default function (engine: Engine.Model): void {
	const deadpool = Engine.getComponent<Deadpool.Model>(
		engine,
		Engine.GlobalEntityID,
		Deadpool.ID
	);

	if (deadpool.entities.length < 1) {
		return;
	}

	for (const id of deadpool.entities) {
		Engine.removeEntity(engine, id);
	}

	Deadpool.clear(deadpool);
}
