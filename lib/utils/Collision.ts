export function testCircleCircle(
	x1: number,
	y1: number,
	r1: number,
	x2: number,
	y2: number,
	r2: number
): boolean {
	const dx = x1 - x2;
	const dy = y1 - y2;
	const distance = Math.sqrt(dx * dx + dy * dy);
	return distance <= r1 + r2;
}
