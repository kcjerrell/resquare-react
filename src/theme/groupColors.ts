import { XY } from "../state/interfaces";
import { getNeighborsList, getXY } from "../utilities/array";

const scheme1 = ['#e6a06f', '#9e9c71', '#5e8271', '#55c7fd', '#6f82ff', '#FF00FF'];

/**
 * Data object interface used for calculating color assignments
 */
interface ColorSquare {
	xy: XY,
	group: number,
	color: number,
}

/**
 * Constructs on object matching the ColorSquare interface for calculating
 * color assignments
 * @param xy the xy coords
 * @param group group number
 * @param color color index
 * @returns an object matching ColorSquare interface
 */
function colSquare(xy: XY, group: number, color: number = -1) : ColorSquare {
	return { xy, group, color };
}

/**
 * A utility class for calculating the colors for square groups.
 * Designed to give adjacent square groups different colors. It uses a naive
 * approach, and has not been tested thoroughly. It will throw an exception
 * if distinct colors could not be calculated for neighboring groups.
 */
export class ColorAssignment {
	squareGroups: number[];
	nGroups: number;
	size: number;

	/**
	 *
	 * @param squareGroups group ids for each square in a puzzle (RawPuzzleData)
	 * @param nGroups the number groups in the puzzle
	 * @param size the puzzle size (side length)
	 */
	constructor(squareGroups: number[], nGroups: number, size: number) {
		this.squareGroups = squareGroups;
		this.nGroups = nGroups;
		this.size = size;
	}

	/**
	 * Calculates the square group colors for the puzzle info provided in
	 * constructor
	 * @returns a list of #colors corresponding with square groups by index
	 */
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
			let wasAssigned = false;
			for (let ci = 0; ci < 5; ci++) {
				const color = (lastColor + ci) % 5; // doing this to avoid assigning colors 0 and 1 too much
				if (!unavailable.includes(color)) {
					colGroups.push(color);
					lastColor = color;
					wasAssigned = true;
					break;
				}
			}

			if (!wasAssigned) {
				throw new Error("Distinct colors for adjacent groups could not be calculated!")
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
