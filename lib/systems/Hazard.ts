import * as Engine from "../engine/Engine";
import * as Collider from "../components/Collider";
import * as Hazard from "../components/Hazard";
import * as Mortal from "../components/Mortal";

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
		for (const contactID of collider.contacts) {
			const mortal = Engine.getComponent<Mortal.Model>(
				engine,
				contactID,
				Mortal.ID
			);
			if (mortal !== undefined) {
				console.log("damage mortal!");
				mortal.health -= hazard.damage;
			}
		}
	}
}
