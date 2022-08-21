import * as Mortal from "../components/Mortal";
import * as Engine from "../engine/Engine";

export default function (engine: Engine.Model): void {
	const mortals = Engine.getComponents<Mortal.Model>(engine, Mortal.ID);
	for (const [id, mortal] of mortals) {
		if (mortal.health <= 0) {
			// TODO: Defer entity removal
			Engine.removeEntity(engine, id);
		}
	}
}
