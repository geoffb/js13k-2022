import * as Shape from "../utils/Shape";
import * as Palette from "./Palette";

export interface SpriteShape {
	type: Shape.Type;
	data: number[];
	fill?: string;
	stroke?: string;
	strokeWidth?: number;
}

export interface Model {
	size: number;
	sprites: SpriteShape[][];
}

export const registry: Record<string, Model> = {
	sprites64: {
		size: 64,
		sprites: [
			[
				{
					type: Shape.Type.Circle,
					data: [0.5, 0.5, 0.4],
					fill: Palette.White,
					stroke: Palette.Black,
					strokeWidth: 2,
				},
				{
					type: Shape.Type.Circle,
					data: [0.5, 0.5, 0.3],
					fill: Palette.Red,
				},
			],
			[
				{
					type: Shape.Type.Rectangle,
					data: [0.2, 0.2, 0.6, 0.6],
					fill: Palette.Pink,
					stroke: Palette.Green,
					strokeWidth: 2,
				},
			],
		],
	},
};
