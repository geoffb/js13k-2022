import * as Engine from "../engine/Engine";
import * as Sprite from "../components/Sprite";
import * as Transform from "../components/Transform";
import * as SpriteSheets from "../data/SpriteSheets";

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
		ctx.resetTransform();
		ctx.translate(Math.round(transform.x), Math.round(transform.y));
		if (transform.r !== 0) {
			ctx.rotate(transform.r);
		}
		if (transform.sx !== 1 || transform.sy !== 1) {
			ctx.scale(transform.sx, transform.sy);
		}
		const surface = engine.surfaces[sprite.sheetID];
		const sheet = SpriteSheets.registry[sprite.sheetID];
		const spritesWide = Math.floor(surface.canvas.width / sheet.size);
		const sx = sprite.index % spritesWide;
		const sy = Math.floor(sprite.index / spritesWide);
		ctx.drawImage(
			surface.canvas,
			sx * sheet.size,
			sy * sheet.size,
			sheet.size,
			sheet.size,
			-sheet.size / 2,
			-sheet.size / 2,
			sheet.size,
			sheet.size
		);
	}
}
