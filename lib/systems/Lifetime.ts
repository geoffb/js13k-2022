import * as Engine from "../engine/Engine";
import * as Deadpool from "../components/Deadpool";
import * as Lifetime from "../components/Lifetime";

export default function (engine: Engine.Model): void {
	const lifetimes = Engine.getComponents<Lifetime.Model>(engine, Lifetime.ID);
	if (lifetimes === undefined) {
		return;
	}

	const deadpool = Engine.getComponent<Deadpool.Model>(
		engine,
		Engine.GlobalEntityID,
		Deadpool.ID
	);

	for (const [id, lifetime] of lifetimes) {
		lifetime.elapsed += engine.deltaTime;
		if (lifetime.elapsed >= lifetime.duration) {
			Deadpool.add(deadpool, id);
		}
	}
}
