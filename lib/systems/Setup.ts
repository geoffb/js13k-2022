import * as Engine from "../engine/Engine";
import * as Shape from "../utils/Shape";
import * as Space from "../components/Space";

export default function (engine: Engine.Model): void {
	// Define global components
	Engine.addComponent(
		engine,
		Engine.GlobalEntityID,
		Space.ID,
		Space.create(Math.floor(512 / 32), Math.floor(256 / 32), 32, 32)
	);

	const sprites = Engine.createSurface(engine, "sprites", 128, 64);
	const ctx = sprites.ctx;

	Shape.draw(ctx, Shape.Type.Circle, [0.5, 0.5, 0.4], 64, "white", "black", 2);
	Shape.draw(ctx, Shape.Type.Circle, [0.5, 0.5, 0.3], 64, "red");

	ctx.translate(64, 0);
	Shape.draw(
		ctx,
		Shape.Type.Rectangle,
		[0.2, 0.2, 0.6, 0.6],
		64,
		"yellow",
		"green",
		2
	);
}
