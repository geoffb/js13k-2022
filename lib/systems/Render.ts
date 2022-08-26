import * as Engine from "../engine/Engine";
import * as Images from "../engine/Images";
import * as Sprite from "../components/Sprite";
import * as Transform from "../components/Transform";

export default function (engine: Engine.Model): void {
	const viewport = engine.viewport;

	const ctx = engine.viewport.context;
	ctx.resetTransform();
	ctx.clearRect(0, 0, viewport.canvas.width, viewport.canvas.height);

	// const image = Images.get(engine.images, "textures.png");
	const image = engine.surfaces["sprites"];
	const spritesWide = Math.floor(image.canvas.width / 64);

	const sprites = Engine.getComponents<Sprite.Model>(engine, Sprite.ID);
	for (const [id, sprite] of sprites) {
		const transform = Engine.getComponent<Transform.Model>(
			engine,
			id,
			Transform.ID
		);
		ctx.resetTransform();
		ctx.translate(Math.round(transform.x), Math.round(transform.y));
		if (transform.r !== 0) {
			ctx.rotate(transform.r);
		}
		if (transform.sx !== 1 || transform.sy !== 1) {
			ctx.scale(transform.sx, transform.sy);
		}
		const sx = sprite.index % spritesWide;
		const sy = Math.floor(sprite.index / spritesWide);
		ctx.drawImage(image.canvas, sx * 64, sy * 64, 64, 64, -32, -32, 64, 64);
	}
}
