import { Borders, SquareState, XY } from "../state/interfaces";
import { range } from "./util";

/**
 * Returns a generator to iterate over items in the same column and row as the
 * given coordinates, in the provided array
 * @param items a linear array of items, representing a 2d square arrangement
 * @param width the width of the square
 * @param xy the x-coordinate of the column and y-coordinate of the row
 * @param excludeCenter if true, the column and row intersection won't be
 * 											included
 */
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

export function* selectByY<T>(items: T[], width: number, y: number) {
	for (let x = 0; x < width; x++) {
		yield selectXY(items, width, { x, y });
	}
}

export function* selectByX<T>(items: T[], width: number, x: number) {
	for (let y = 0; y < width; y++) {
		yield selectXY(items, width, { x, y });
	}
}

/**
 * @param items a linear array of items, representing a 2d square arrangement
 * @param width the width of the square
 * @param xy the xy coordinate of the desired item
 * @returns Returns the item in the xy coordinate position of a 2d grid of items
 */
export function selectXY<T>(items: T[], width: number, xy: XY): T {
	const { x, y } = xy;
	const index = y * width + x;
	return items[index];
}

/**
 * Returns the xy coordinate of the specified index in an array representing a
 * 2d square
 * @param index the index of the item in the 2d array
 * @param width the width of the square
 * @returns the xy coordinate corresponding to the given index
 */
export function getXY(index: number, width: number) {
	const y = Math.floor(index / width);
	const x = index % width;
	return { x, y };
}

/**
 * Returns a generator that iterates over items in the specified row
 * @param items a linear array of items, representing a 2d square
 * @param width the width of the square
 */
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

/**
 * Returns a generator that iterates over all squares in the specified square
 * group
 * @param squares an array of puzzle squares
 * @param group the group id to return
 */
export function* byGroup(squares: SquareState[], group: number) {
	for (const square of squares) {
		if (square.group === group)
			yield square;
	}
}

/**
 * Returns a list of the the specified item's neighbors, in an array
 * representing a 2d square
 * @param items a linear array of items, representing a 2d square
 * @param width the width of the square
 * @param xy the coordinates of the target square
 * @returns a list of the specified item's neighbors
 */
export function getNeighborsList<T>(items: T[], width: number, xy: XY) {
	const { x, y } = xy;
	const neighborsXY = [
		{ x: x + 1, y },
		{ x: x - 1, y },
		{ x, y: y + 1 },
		{ x, y: y - 1 }
	].filter(xy => xy.x >= 0 && xy.x < width && xy.y >= 0 && xy.y < width);

	return neighborsXY.map(xy => selectXY(items, width, xy));
};

/**
 * Returns a Borders object with the specified squares neighbors
 * @param squares a linear array of items, representing a 2d square
 * @param width the width of the square
 * @param xy the coordinates of the target square
 * @returns a Borders object with the specified item's neighbors
 */
export function getBordering<T>(squares: T[], width: number, xy: XY): Borders<T> {
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

/**
 * Returns every other item, staggered across rows, in an array of items
 * representing a 2d square - in other words, returns all the "white" squares
 * on a checkerboard
 * @param items a linear array of items, representing a 2d square
 * @param width the width of the square
 * @param odd returns the "black" items, instead of the "white" items
 */
export function* checker<T>(items: T[], width: number, odd = false) {
	let offset = odd ? 1 : 0;

	for (let y = 0; y < width; y++) {
		for (let x = (y + offset) % 2; x < width; x += 2) {
			yield selectXY(items, width, { x, y });
		}
	}
}

export function* iterIter<T>(items: T[][]) {
	for (const item of items) {
		for (const subItem of item) {
			yield subItem;
		}
	}
}
