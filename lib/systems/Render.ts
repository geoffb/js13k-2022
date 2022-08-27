import * as Engine from "../engine/Engine";
import * as Images from "../engine/Images";
import * as Sprite from "../components/Sprite";
import * as Text from "../components/Text";
import * as Transform from "../components/Transform";

const SpriteSize = 16;

const FontGlyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function (engine: Engine.Model): void {
	const ctx = engine.viewport.context;
	ctx.resetTransform();

	const background = engine.surfaces["background"];
	ctx.drawImage(background.canvas, 0, 0);

	const image = Images.get(engine.images, "textures.png");
	const spritesWide = Math.floor(image.width / SpriteSize);

	const sprites = Engine.getComponents<Sprite.Model>(engine, Sprite.ID);
	if (sprites !== undefined) {
		for (const [id, sprite] of sprites) {
			const transform = Engine.getComponent<Transform.Model>(
				engine,
				id,
				Transform.ID
			);
			if (!transform.v) {
				continue;
			}
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

	const font = Images.get(engine.images, "font.png");
	const fontSpritesWide = Math.floor(font.width / SpriteSize);

	const hh = SpriteSize / 2;

	const texts = Engine.getComponents<Text.Model>(engine, Text.ID);
	if (texts !== undefined) {
		for (const [id, text] of texts) {
			const transform = Engine.getComponent<Transform.Model>(
				engine,
				id,
				Transform.ID
			);
			if (!transform.v) {
				continue;
			}
			ctx.resetTransform();
			ctx.translate(Math.round(transform.x), Math.round(transform.y));
			if (transform.r !== 0) {
				ctx.rotate(transform.r);
			}
			if (transform.sx !== 1 || transform.sy !== 1) {
				ctx.scale(transform.sx, transform.sy);
			}
			const offsetX = -Math.floor((text.value.length * SpriteSize) / 2);
			for (let i = 0; i < text.value.length; i++) {
				const index = FontGlyphs.indexOf(text.value[i]);
				if (index !== -1) {
					const gx = index % fontSpritesWide;
					const gy = Math.floor(index / fontSpritesWide);
					ctx.drawImage(
						font,
						gx * SpriteSize,
						gy * SpriteSize,
						SpriteSize,
						SpriteSize,
						offsetX + i * SpriteSize,
						-hh,
						SpriteSize,
						SpriteSize
					);
				}
			}
		}
	}
}
