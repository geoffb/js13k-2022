import * as Engine from "./engine/Engine";
import Test from "./systems/Test";

const engine = Engine.create();

engine.systems.push(Test);

function frame(time: number): void {
	Engine.update(engine, time);
	requestAnimationFrame(frame);
}

frame(performance.now());
