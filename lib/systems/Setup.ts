import * as Space from "../components/Space";
import * as SpriteSheets from "../data/SpriteSheets";
import * as Engine from "../engine/Engine";
import * as Shape from "../utils/Shape";

export default function (engine: Engine.Model): void {
	// Define global components
	Engine.addComponent(
		engine,
		Engine.GlobalEntityID,
		Space.ID,
		Space.create(Math.floor(512 / 32), Math.floor(256 / 32), 32, 32)
	);

	// Create sprite sheets from data
	for (const sheetID in SpriteSheets.registry) {
		const sheet = SpriteSheets.registry[sheetID];
		const surface = Engine.createSurface(
			engine,
			sheetID,
			sheet.size * sheet.sprites.length,
			sheet.size
		);
		const ctx = surface.ctx;
		for (let i = 0; i < sheet.sprites.length; i++) {
			const sprite = sheet.sprites[i];
			for (const shape of sprite) {
				Shape.draw(
					ctx,
					shape.type,
					shape.data,
					sheet.size,
					shape.fill,
					shape.stroke,
					shape.strokeWidth
				);
			}
			ctx.translate(sheet.size, 0);
		}
	}
}
