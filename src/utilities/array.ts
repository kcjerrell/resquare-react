import { Borders, RawPuzzleData, SquareState, XY } from "../state/interfaces";
import { range } from "./util";

export function* selectByXY<T>(items: T[], width: number, xy: XY, excludeCenter = false) {
	const { x, y } = xy;

	const select = (sx: number, sy: number) => {
		return selectXY(items, width, { x: sx, y: sy });
	}

	if (x >= 0 && x < width) {
		for (const yi of range(width)) {
			if (excludeCenter && yi !== y) {
				yield select(x, yi);
			}
			else
				yield select(x, yi);
		}
	}

	if (y >= 0 && y < width) {
		for (const xi of range(width)) {
			if (excludeCenter && xi !== x)
				yield select(xi, y);
			else
				yield select(xi, y);
		}
	}
}

export function selectXY<T>(items: T[], width: number, xy: XY) : T {
	const { x, y } = xy;
	const index = y * width + x;
	return items[index];
}

export function getXY(index: number, width: number) {
	const y = Math.floor(index / width);
	const x = index % width;
	return { x, y };
}

export function* byRows<T>(items: T[], width: number) {
	for (let y = 0; y < width; y++) {
		const rowIndex = y * width;
		const row = [];

		for (let x = 0; x < width; x++) {
			row.push(items[rowIndex + x]);
		}

		yield row;
	}
}

export function* byGroup(squares: SquareState[], group: number) {
	for (const square of squares) {
		if (square.group === group)
			yield square;
	}
}

export function getNeighborsList<T>(squares: T[], width: number, xy: XY) {
	const { x, y } = xy;
	const neighborsXY = [
		{ x: x + 1, y },
		{ x: x - 1, y },
		{ x, y: y + 1 },
		{ x, y: y - 1 }
	].filter(xy => xy.x >= 0 && xy.x < width && xy.y >= 0 && xy.y < width);

	return neighborsXY.map(xy => selectXY(squares, width, xy));
};

export function getBordering<T>(squares: T[], width: number, xy: XY) : Borders<T> {
	const { x, y } = xy;
	const nxy = [
		{ x: x - 1, y },
		{ x, y: y - 1 },
		{ x: x + 1, y },
		{ x, y: y + 1 },
	]

	const inBounds = (xy: XY) => xy.x >= 0 && xy.x < width && xy.y >= 0 && xy.y < width;

	const borders = {
		left: inBounds(nxy[0]) ? selectXY(squares, width, nxy[0]) : null,
		top: inBounds(nxy[1]) ? selectXY(squares, width, nxy[1]) : null,
		right: inBounds(nxy[2]) ? selectXY(squares, width, nxy[2]) : null,
		bottom: inBounds(nxy[3]) ? selectXY(squares, width, nxy[3]) : null,
	}

	return borders;
};

export function* checker<T>(items: T[], width: number, odd = false) {
	let offset = odd ? 1 : 0;

	for (let y = 0; y < width; y++) {
		for (let x = (y + offset) % 2; x < width; x += 2) {
			yield selectXY(items, width, { x, y });
		}
	}
}
