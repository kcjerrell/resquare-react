import { AppDispatch } from "../app/store";
import { PuzzleState, SquareState } from "../state/interfaces";
import { checker, getBordering, getNeighborsList, getXY } from "../utilities/array";
import { range } from "../utilities/util";
import { Group } from "./group";
import { Rule } from "./rule";
import { Square, squareHandler } from "./square";

export class Puzzle {
	state: PuzzleState;
	size: number = 0;
	squares: Square[] = [];
	groups: Group[] = [];
	dispatch: AppDispatch | null = null;

	constructor(puzzleState: PuzzleState, dispatch: AppDispatch) {
		const { size, groups, squares } = this.state = puzzleState;

		this.size = size;

		this.groups = groups.map(g => new Group(g));

		this.squares = this.genSquares(squares, dispatch);
	}

	genSquares(squareStates: SquareState[], dispatch: AppDispatch) {
		const columns = lineCounter(this.size);
		const rows = lineCounter(this.size);

		for (let i = 0; i < squareStates.length; i++) {
			const squareState = squareStates[i];
			const { x, y } = getXY(i, this.size);
			if (squareState.selected > 0) {
				columns[x].push(squareState.selected);
				rows[y].push(squareState.selected);
			}
		}

		const squares = squareStates.map((ss, i) => {
			const { x, y } = getXY(i, this.size);

			let square = new Square({
				x,
				y,
				solution: ss.solution,
				group: this.groups[ss.group],
				selected: ss.selected,
				excluded: ss.excluded,
				puzzle: this
			})

			square = new Proxy(square, squareHandler(dispatch));
			square.unavailable = [...rows[y], ...columns[x]];

			this.groups[ss.group].squares.push(square);

			return square;
		});

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

function lineCounter(n: number): number[][] {
	const line = []
	for (const i of range(n)) {
		line.push([]);
	}
	return line;
}
