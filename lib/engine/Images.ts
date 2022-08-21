export interface Model {
	cache: Record<string, HTMLImageElement>;
}

export function create(): Model {
	return {
		cache: {},
	};
}

export function load(model: Model, url: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("load", () => {
			model.cache[url] = image;
			resolve();
		});
		image.addEventListener("error", () =>
			reject(new Error(`Failed to load image: ${url}`))
		);
		image.src = url;
	});
}

export async function loadBatch(model: Model, urls: string[]): Promise<void> {
	const batch: Promise<void>[] = [];
	for (const url of urls) {
		batch.push(load(model, url));
	}
	await Promise.all(batch);
}

export function get(model: Model, url: string): HTMLImageElement {
	return model.cache[url];
}
