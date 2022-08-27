import * as Game from "../components/Game";
import * as Space from "../components/Space";
import * as Transform from "../components/Transform";
import * as Engine from "../engine/Engine";
import * as Images from "../engine/Images";
import * as Level from "../data/Level";

export default function (engine: Engine.Model): void {
	Engine.addComponent(
		engine,
		Engine.GlobalEntityID,
		Space.ID,
		Space.create(Math.floor(512 / 32), Math.floor(256 / 32), 32, 32)
	);

	const game = Engine.addComponent(
		engine,
		Engine.GlobalEntityID,
		Game.ID,
		Game.create()
	);

	const background = Engine.createSurface(engine, "background", 512, 256);
	const tileset = Images.get(engine.images, "tiles.png");
	const tilesWide = Math.floor(tileset.width / Level.TileSize);
	const ctx = background.ctx;

	for (let i = 0; i < Level.tiles.length; i++) {
		const tile = Level.tiles[i];
		const mx = i % Level.width;
		const my = Math.floor(i / Level.width);
		const tx = tile % tilesWide;
		const ty = Math.floor(tile / tilesWide);
		ctx.drawImage(
			tileset,
			tx * Level.TileSize,
			ty * Level.TileSize,
			Level.TileSize,
			Level.TileSize,
			mx * Level.TileSize,
			my * Level.TileSize,
			Level.TileSize,
			Level.TileSize
		);
	}

	const heroID = Engine.spawnPrefab(engine, "hero");
	const heroTransform = Engine.getComponent<Transform.Model>(
		engine,
		heroID,
		Transform.ID
	);
	heroTransform.x = 512 / 2;
	heroTransform.y = 256 / 2;

	game.playerID = heroID;

	const clopsID = Engine.spawnPrefab(engine, "cyclops");
	const clopsTransform = Engine.getComponent<Transform.Model>(
		engine,
		clopsID,
		Transform.ID
	);
	clopsTransform.x = 128;
	clopsTransform.y = 64;

	const lancerID = Engine.spawnPrefab(engine, "lancer");
	const lancerTransform = Engine.getComponent<Transform.Model>(
		engine,
		lancerID,
		Transform.ID
	);
	lancerTransform.x = 128;
	lancerTransform.y = 128;
}
