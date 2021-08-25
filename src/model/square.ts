import { AppDispatch } from "../app/store";
import { Borders } from "../state/interfaces";
import { selectDigit } from "../state/puzzleSlice";
import { Group } from "./group";
import { Puzzle } from "./puzzle";

export interface SquareProps {
	x: number,
	y: number,
	solution: number,
	group: Group,
	selected?: number;
	excluded?: number[];
	puzzle: Puzzle
}

export class Square {
	x: number;
	y: number;
	solution: number;
	group: Group;
	selected: number;
	excluded: number[];
	unavailable: number[] = [];
	puzzle: Puzzle;
	neighborInGroup: Borders<boolean> = {
		left: false,
		top: false,
		right: false,
		bottom: false
	};

	constructor(props: SquareProps) {
		const { x, y, solution, group, selected, excluded, puzzle } = props;
		this.x = x;
		this.y = y;
		this.solution = solution;
		this.group = group;
		this.selected = selected ? selected : 0;
		this.excluded = excluded ? excluded : [];
		this.puzzle = puzzle;
	}
}

// Any operations that affect state need to be set up in the proxy handler
// They should be designed as if it's not proxied though
// For instance, within the square class, SelectDigit() should be written normally
// as if it's a live data model class - not dependant on react hooks or redux.

// To support this pattern, I should probably make use of cached property getters
// for derived values (ie digit: unavailable) [actually I'm not sure about that because
// I think it would need to be recalculated as soon as React rerenders]

export const squareHandler = (dispatch: AppDispatch) => {
	return {
		set: function (square: Square, prop: string, value: any) {
			if (prop === 'selected') {
				const { x, y } = square;
				const digit = value;
				dispatch(selectDigit({ x, y, digit }));
			}

			square[prop as keyof typeof square] = value;
			return true;
		}
	}
}
