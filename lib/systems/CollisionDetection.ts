import * as Engine from "../engine/Engine";
import * as Collider from "../components/Collider";
import * as Space from "../components/Space";
import * as Transform from "../components/Transform";
import * as Collision from "../utils/Collision";

export default function (engine: Engine.Model): void {
	const space = Engine.getComponent<Space.Model>(
		engine,
		Engine.GlobalEntityID,
		Space.ID
	);

	for (const cell of space.cells) {
		if (cell !== undefined) {
			cell.length = 0;
		}
	}

	const colliders = Engine.getComponents<Collider.Model>(engine, Collider.ID);
	if (colliders === undefined) {
		return;
	}

	for (const [id, collider] of colliders) {
		collider.contacts.length = 0;

		const transform = Engine.getComponent<Transform.Model>(
			engine,
			id,
			Transform.ID
		);
		const bx = transform.x + collider.ox - collider.radius;
		const by = transform.y + collider.oy - collider.radius;
		const size = collider.radius * 2;

		const ox = Math.floor(bx / space.cellWidth);
		const oy = Math.floor(by / space.cellHeight);
		const tx = Math.floor((bx + size) / space.cellWidth);
		const ty = Math.floor((by + size) / space.cellHeight);

		for (let y = oy; y <= ty; y++) {
			for (let x = ox; x <= tx; x++) {
				const index = y * space.width + x;
				let cell = space.cells[index];
				if (cell === undefined) {
					cell = space.cells[index] = [];
				}
				cell.push(id);
			}
		}
	}

	for (const [id, collider] of colliders) {
		const transform = Engine.getComponent<Transform.Model>(
			engine,
			id,
			Transform.ID
		);
		const bx = transform.x + collider.ox - collider.radius;
		const by = transform.y + collider.oy - collider.radius;
		const size = collider.radius * 2;

		const ox = Math.floor(bx / space.cellWidth);
		const oy = Math.floor(by / space.cellHeight);
		const tx = Math.floor((bx + size) / space.cellWidth);
		const ty = Math.floor((by + size) / space.cellHeight);

		for (let y = oy; y <= ty; y++) {
			for (let x = ox; x <= tx; x++) {
				const index = y * space.width + x;
				const cell = space.cells[index];
				if (cell !== undefined) {
					for (const otherID of cell) {
						if (otherID === id) {
							continue;
						}
						const otherTransform = Engine.getComponent<Transform.Model>(
							engine,
							otherID,
							Transform.ID
						);
						const otherCollider = Engine.getComponent<Collider.Model>(
							engine,
							otherID,
							Collider.ID
						);
						if (
							Collision.testCircleCircle(
								transform.x + collider.ox,
								transform.y + collider.oy,
								collider.radius,
								otherTransform.x + otherCollider.ox,
								otherTransform.y + otherCollider.oy,
								otherCollider.radius
							)
						) {
							const ox = collider.contacts.push(otherID);
						}
					}
				}
			}
		}
	}
}
