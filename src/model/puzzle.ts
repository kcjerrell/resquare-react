import { AppDispatch } from "../app/store";
import { PuzzleState, SquareState } from "../state/interfaces";
import { checker, getBordering, getXY } from "../utilities/array";
import { range } from "../utilities/util";
import { Group } from "./group";
import { Square } from "./square";

/**
 * The Puzzle helper class
 *
 * This is constructed after every state update to construct the other helper
 * classes and generate state-derivative values
 */
export class Puzzle {
	/** A reference to the puzzle state object */
	state: PuzzleState;

	/** The size (side-length) of the puzzle */
	size: number = 0;

	/** A list of the puzzle's (helper) squares */
	squares: Square[] = [];

	/** A list of the puzzle's (helper) square groups */
	groups: Group[] = [];

	/** The redux dispatch for dispatching actions */
	dispatch: AppDispatch | null = null;

	constructor(puzzleState: PuzzleState, dispatch: AppDispatch) {
		const { size, groups, squares } = this.state = puzzleState;

		this.size = size;

		this.groups = groups.map(g => new Group(g));

		this.squares = this.genSquares(squares, dispatch);
	}

	/** Generatets the square helper objects
	 * 	Current the dispatch is provided to the square, but I am rethinking that.
	 * 	The idea was to use proxies so properties on the helper object could be
	 * 	changed directly, and it would automatically update the state. In
	 *  practice, it seems to be just as easy to dispatch state changes from the
	 *  component. After this code clean-up, I'm going to do a brief
	 *  architectural review (before implementing groups hints, puzzle hints,
	 *  the solver, and the generator).
	 */
	genSquares(squareStates: SquareState[], dispatch: AppDispatch) {
		const columns = lineCounter(this.size);
		const rows = lineCounter(this.size);

		// Finding all the 'selected' values, so digits can be made unavailable
		// across that column/row
		for (let i = 0; i < squareStates.length; i++) {
			const squareState = squareStates[i];
			const { x, y } = getXY(i, this.size);
			if (squareState.selected > 0) {
				columns[x].push(squareState.selected);
				rows[y].push(squareState.selected);
			}
		}

		// Constructed the square helper objects (proxied)
		const squares = squareStates.map((ss, i) => {
			const { x, y } = getXY(i, this.size);

			const square = new Square({
				x,
				y,
				solution: ss.solution,
				group: this.groups[ss.group],
				selected: ss.selected,
				excluded: ss.excluded,
				puzzle: this
			})

			// no longer using proxies for state changes
			// square = new Proxy(square, squareHandler(dispatch));

			square.unavailable = [...rows[y], ...columns[x]];
			this.groups[ss.group].addSquare(square);

			return square;
		});

		// Calculating border widths between squares
		for (const square of checker(squares, this.size)) {
			const nbors = getBordering(squares, this.size, { x: square.x, y: square.y });

			if (nbors.left && nbors.left.group === square.group) {
				square.neighborInGroup.left = true;
				nbors.left.neighborInGroup.right = true;
			}
			if (nbors.top && nbors.top.group === square.group) {
				square.neighborInGroup.top = true;
				nbors.top.neighborInGroup.bottom = true;
			}
			if (nbors.right && nbors.right.group === square.group) {
				square.neighborInGroup.right = true;
				nbors.right.neighborInGroup.left = true;
			}
			if (nbors.bottom && nbors.bottom.group === square.group) {
				square.neighborInGroup.bottom = true;
				nbors.bottom.neighborInGroup.top = true;
			}
		}

		return squares;
	}
}

/**
 * Generates a list of n lists, for counting selections across a column or row
 * @param n How many sub-lists to add (how many columns or rows - puzzle size)
 * @returns A list of n empty lists
 */
function lineCounter(n: number): any[][] {
	const line = []
	for (const i of range(n)) {
		line.push([]);
	}
	return line;
}
