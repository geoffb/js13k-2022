import * as Engine from "../engine/Engine";

export default function (engine: Engine.Model): void {
	const viewport = engine.viewport;
	viewport.context.fillStyle = "cornflowerblue";
	viewport.context.fillRect(
		0,
		0,
		viewport.canvas.width,
		viewport.canvas.height
	);
}
