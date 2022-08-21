import * as Engine from "./engine/Engine";
import Render from "./systems/Render";

const engine = Engine.create();

engine.systems.push(Render);

function frame(time: number): void {
	Engine.update(engine, time);
	requestAnimationFrame(frame);
}

frame(performance.now());
