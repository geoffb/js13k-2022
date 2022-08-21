import * as Engine from "../engine/Engine";
import * as Images from "../engine/Images";
import * as Sprite from "../components/Sprite";
import * as Transform from "../components/Transform";

export default function (engine: Engine.Model): void {
	const viewport = engine.viewport;

	const ctx = engine.viewport.context;
	ctx.resetTransform();
	ctx.clearRect(0, 0, viewport.canvas.width, viewport.canvas.height);

	const sprites = Engine.getComponents<Sprite.Model>(engine, Sprite.ID);
	for (const [id, sprite] of sprites) {
		const transform = Engine.getComponent<Transform.Model>(
			engine,
			id,
			Transform.ID
		);
		transform.r += (Math.PI / 400) * engine.deltaTime;
		ctx.resetTransform();
		ctx.translate(Math.round(transform.x), Math.round(transform.y));
		if (transform.r !== 0) {
			ctx.rotate(transform.r);
		}
		const image = Images.get(engine.images, "textures.png");
		ctx.drawImage(image, 0, 0, 16, 16, -8, -8, 16, 16);
	}
}
