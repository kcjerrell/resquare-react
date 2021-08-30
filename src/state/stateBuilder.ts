import { combos, combosRep, generateHints } from "../model/hintGenerator";
import { hintableRules, RuleTypes as RT } from "../model/rule";
import { ColorAssignment } from "../theme/groupColors";
import { getBordering, getXY } from "../utilities/array";
import { GroupState, PuzzleState, RawPuzzleData, SquareState } from "./interfaces";

/*

The PuzzleState includes not only values that change, but values that require
some calculation that would be costly to recalculate everytime the state updates
I guess I could use useRef for this, but whatever. The Puzzle state includes...

	The puzzle size (side length)

	The hover group (to show relevant hints)

	The SquareGroups
		RuleType
		Value
		Color
		Possible solutions

	The Squares
		Index reference to Group
		Solution value
		Selected value
		Excluded digits
		Comparison to right and down neighbors for compare groups
		whether or not the square holds the label for the group
*/


export function buildPuzzleState(data: RawPuzzleData): PuzzleState {
	const { groupRules, groupValues, squareGroups, squareValues } = data;

	const size = Math.sqrt(squareValues.length);

	// calculate color assignments
	const ca = new ColorAssignment(squareGroups, groupRules.length, size);
	const colors = ca.getColors();

	// create GroupStates
	const groups: GroupState[] = groupRules.map((g, i) => {
		return {
			rule: g,
			value: groupValues[i],
			color: colors[i]
		};
	});

	// create SquareStates
	const squares: SquareState[] = squareValues.map((value, i) => {
		return {
			solution: value,
			group: squareGroups[i],
			selected: 0,
			excluded: []
		};
	});

	// Assign group keys
	const keyed: number[] = [];
	for (const square of squares) {
		if (!keyed.includes(square.group)) {
			square.isGroupKey = true;
			keyed.push(square.group);
		}
	}

	// Add comparisons for comparison groups
	for (let i = 0; i < squares.length; i++) {
		const square = squares[i];
		const group = square.group;
		if (groups[group].rule === RT.Compare) {
			const xy = getXY(i, size);
			const neighbors = getBordering(squares, size, xy);

			if (neighbors.right != null && neighbors.right.group === group) {
				square.compareRight = square.solution - neighbors.right.solution;
			}

			if (neighbors.bottom != null && neighbors.bottom.group === group) {
				square.compareDown = square.solution - neighbors.bottom.solution;
			}
		}
	}

	// Generate solutions for hintable groups
	groups.forEach((group, groupIndex) => {
		if (hintableRules.includes(group.rule)) {

			const xys = [];
			for (let si = 0; si < squareGroups.length; si++) {
				if (squareGroups[si] === groupIndex) {
					const xy = getXY(si, size);
					xys.push(xy);
				}
			}

			const nSquares = xys.length;
			const minX = Math.min(...xys.map(xy => xy.x));
			const maxX = Math.max(...xys.map(xy => xy.x));
			const minY = Math.min(...xys.map(xy => xy.y));
			const maxY = Math.max(...xys.map(xy => xy.y));
			const xw = maxX - minX + 1;
			const yw = maxY - minY + 1;
			const span = Math.min(xw, yw);

			const opts = {
				ruleType: group.rule,
				value: group.value || 0,
				nSquares,
				size,
				span
			}

			group.solutions = generateHints(opts);
		}
	})


	return {
		size,
		groups,
		squares,
		hoverGroup: 0
	};
}
