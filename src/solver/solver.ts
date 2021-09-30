/*
	The primary approach for solving puzzles is by eliminating digits
	Strategies for doing this are...
		- SquareGroup Rule strategies
			a "12x" group of 2 squares can be either [2,6] or [3,4]. This eliminates 1, 5, 7, 9
			"5=" square is solved automatically
			"e" and "o" groups eliminate half digits
			">" groups can continually eliminate digits accross all squares
		- Last digit remaining
			If only one "5" remains in any column or row, it can be selected as the solution
		- N-Pairs
			If two squares in a row only have [1,5] remaining, then [1,5] can be eliminated in every other square in the row

	These strategies can be repeated until every square has a solution
*/

import { validateSolution } from "../model/hintChecker";
import { generateHints, GenerateHintsOpts } from "../model/hintGenerator";
import { ruleType, RuleTypes } from "../model/rule";
import { RawPuzzleData, XY } from "../state/interfaces";
import { measureGroup } from "../state/stateBuilder";
import { getXY, iterIter, selectByX, selectByXY, selectByY } from "../utilities/array";
import { range } from "../utilities/util";

type SolvingStrategy = (puzzle: PuzzleSolver) => void;

/**
 * Provides functionality for solving puzzles
 */
export class PuzzleSolver {
	puzzleData: RawPuzzleData;
	size: number;
	groups: SolverGroup[] = [];
	squares: SolverSquare[] = [];
	strategies: SolvingStrategy[] = [groupRuleStrategy];;

	constructor(puzzleData: RawPuzzleData) {
		this.puzzleData = puzzleData;
		const { groupRules, groupValues, squareGroups } = puzzleData;
		this.size = Math.floor(Math.sqrt(puzzleData.squareGroups.length));

		this.groups = groupRules.map((g, i) => new SolverGroup(this, g, groupValues[i]));
		this.squares = squareGroups.map((sq, i) => new SolverSquare(getXY(i, this.size), this.groups[sq], this));
		this.groups.forEach((g, i) => {
			const [nSquares, span] = measureGroup(squareGroups, i, this.size);
			const gprops: GenerateHintsOpts = {
				nSquares,
				ruleType: g.rule,
				size: this.size,
				span,
				value: g.value
			};
			g.hints = generateHints(gprops);
		});
	}

	proc() {
		for (const strategy of this.strategies) {
			strategy(this);
		}
	}
}

export class SolverSquare {
	solution: number = 0;
	group?: SolverGroup;
	xy: XY;
	digits: boolean[];
	puzzle: PuzzleSolver;

	constructor(xy: XY, group: SolverGroup, puzzle: PuzzleSolver) {
		this.xy = xy;
		this.group = group;
		this.puzzle = puzzle;

		this.digits = new Array(puzzle.size + 1).fill(true);
		this.group.addSquare(this);
	}

	public get size(): number {
		return this.puzzle.size;
	}

	public get available(): number[] {
		const available: number[] = [];
		this.digits.forEach((avail, i) => {
			if (avail && i > 0)
				available.push(i);
		});
		return available;
	}

	eliminate(digit: number) {
		this.digits[digit] = false;
	}

	select(digit: number) {
		this.solution = digit;

		for (const sq of selectByXY(this.puzzle.squares, this.size, this.xy, true)) {
			sq.eliminate(digit);
		}

		this.digits.fill(false);
		this.digits[digit] = true;
	}
}

export class SolverGroup {
	puzzle: PuzzleSolver;
	squares: SolverSquare[] = [];
	rule: RuleTypes;
	value: number;
	solved: boolean = false;
	hints: number[][] = [];

	constructor(puzzle: PuzzleSolver, rule: RuleTypes, value: number) {
		this.puzzle = puzzle;
		this.rule = rule;
		this.value = value;
	}

	addSquare(square: SolverSquare) {
		this.squares.push((square));
	}

	get selected() {
		return this.squares.filter(sq => sq.solution > 0).map(sq => sq.solution);
	}

	get available() {
		const avail: number[] = []
		for (const sq of this.squares) {
			sq.digits.forEach((dig, i) => {
				if (dig)
					avail.push(i);
			})
		}
		return avail;
	}
}

function groupRuleStrategy(puzzle: PuzzleSolver) {
	const { groups, squares, size } = puzzle;

	for (const group of groups.filter(g => !g.solved)) {
		switch (group.rule) {
			case RuleTypes.Equals:
				group.squares[0].select(group.value);
				return;

			case RuleTypes.Add:
			case RuleTypes.Subtract:
			case RuleTypes.Multiply:
			case RuleTypes.Divide:
				const solutions = group.hints.map(h => validateSolution(h, group));
				const digits = new Set(iterIter(solutions.filter(sol => sol.isValid).map(sol => sol.solution)));
				for (let i = 1; i <= size; i++) {
					if (!digits.has(i)) {
						group.squares.forEach(sq => sq.digits[i] = false);
					}
				}
				return;

			case RuleTypes.Odd:
				for (let i = 2; i <= size; i += 2) {
					group.squares.forEach(sq => sq.digits[i] = false);
				}
				return;

			case RuleTypes.Even:
				for (let i = 1; i <= size; i += 2) {
					group.squares.forEach(sq => sq.digits[i] = false);
				}
				return;

			case RuleTypes.Compare:
				case RuleTypes.Straight:
				return;
		}
	}
}

function lastDigitRemaining(puzzle: PuzzleSolver) {
	const { groups, squares, size } = puzzle;

	const lines = [];
	for (const i of range(size)) {
		lines.push(selectByX(squares, size, i));
		lines.push(selectByY(squares, size, i));
	}

	for (const line of lines) {
		const squares = Array.from(line);
		const digits = new Array(size + 1).fill(0);

		squares.forEach(sq => {
			sq.digits.forEach((dig, i) => {
				if (dig)
					digits[i] += 1;
			})
		})
	}
}