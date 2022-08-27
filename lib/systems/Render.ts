import * as Engine from "../engine/Engine";
import * as Images from "../engine/Images";
import * as Sprite from "../components/Sprite";
import * as Transform from "../components/Transform";

const SpriteSize = 16;

export default function (engine: Engine.Model): void {
	const ctx = engine.viewport.context;
	ctx.resetTransform();

	const background = engine.surfaces["background"];
	ctx.drawImage(background.canvas, 0, 0);

	const image = Images.get(engine.images, "textures.png");
	const spritesWide = Math.floor(image.width / SpriteSize);

	const sprites = Engine.getComponents<Sprite.Model>(engine, Sprite.ID);
	if (sprites === undefined) {
		return;
	}

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
		ctx.drawImage(
			image,
			sx * SpriteSize,
			sy * SpriteSize,
			SpriteSize,
			SpriteSize,
			-Math.round(SpriteSize / 2),
			-Math.round(SpriteSize / 2),
			SpriteSize,
			SpriteSize
		);
	}
}
