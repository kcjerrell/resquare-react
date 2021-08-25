import { XY } from "../state/interfaces";
import { getNeighborsList, getXY, selectXY } from "../utilities/array";
import { range } from "../utilities/util";

const scheme1 = ['#e6a06f', '#9e9c71', '#5e8271', '#55c7fd', '#6f82ff', '#FF00FF'];

interface ColorSquares {
	xy: XY,
	group: number,
	color: number,
}

function colSquare(xy: XY, group: number, color: number = -1) {
	return { xy, group, color };
}

export class ColorAssignment {
	squareGroups: number[];
	nGroups: number;
	size: number;

	constructor(squareGroups: number[], nGroups: number, size: number) {
		this.squareGroups = squareGroups;
		this.nGroups = nGroups;
		this.size = size;
	}

	getColors(): string[] {
		let lastColor = 0;

		const colGroups: number[] = [];

		// we need to be able to unique identify squares after filtering the array
		// because we can't rely on index to find xy
		const squares = this.squareGroups.map((group, i) => {
			const xy = getXY(i, this.size);
			return {
				xy,
				group
			}
		});

		// iterate through each group
		for (let i = 0; i < this.nGroups; i++) {
			// get the squares in a group
			const group = squares.filter(sq => sq.group === i);

			// get the list of each squares neighboring groups
			let neighborGroups = new Set<number>();
			for (const gs of group) {
				neighborGroups = union(neighborGroups, this.getSquareNeighbors(gs.xy));
			}

			// get a list of those groups assigned colors
			const unavailable: number[] = [];
			for (const ng of neighborGroups) {
				if (colGroups.length > ng) {
					unavailable.push(colGroups[ng]);
				}
			}

			// assign the group the next available color
			for (let ci = 0; ci < 5; ci++) {
				const color = (lastColor + ci) % 5; // doing this to avoid assigning colors 0 and 1 too much
				if (!unavailable.includes(color)) {
					colGroups.push(color);
					lastColor = color;
					break;
				}
			}
		}

		return colGroups.map(c => scheme1[c]);
	}

	/**
	 * Returns a list of the squares neighboring group numbers
	 */
	getSquareNeighbors(xy: XY) {
		return getNeighborsList(this.squareGroups, this.size, xy)
	};
}

function union<T>(setA: Set<T>, setB: Set<T> | T[]) {
	let _union = new Set(setA)
	for (let elem of setB) {
		_union.add(elem)
	}
	return _union
}
