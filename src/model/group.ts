import { GroupState } from "../state/interfaces";
import { hintableRules, Rule, RuleTypes } from "./rule";
import { Square } from "./square";

class Solution {
	solution: number[];
	isValid: boolean;

	constructor(...items: number[]) {
		this.solution = items;
		this.isValid = false;
	}
}

/**
 * Represents a group of squares with a shared rule.
 *
 * It is generated dynamically by the puzzle helper class on each state update.
 */
export class Group {
	state: GroupState;
	rule: Rule;
	squares: Square[] = [];
	color: string;
	solutions?: number[][];

	selected: number[];
	available: number[]
	__validated: Solution[] | undefined;

	constructor(groupState: GroupState) {
		this.state = groupState;
		this.rule = new Rule(groupState.rule, groupState.value);
		this.color = groupState.color;

		this.solutions = groupState.solutions;
		this.selected = [];
		this.available = [];
	}

	addSquare(square: Square) {
		this.squares.push(square);

		if (hintableRules.includes(this.rule.type)) {
			if (square.selected > 0) {
				this.selected.push(square.selected);
			}
			else {
				for (const digit of square.getAvailableDigits()) {
					this.available.push(digit);
				}
			}
		}
	}


	public get validatedSolutions(): Solution[] {
		if (this.__validated === undefined) {
			if (this.solutions === undefined) {
				this.__validated = [];
			}
			else {
				this.__validated = this.solutions.map(sol => this.validateSolution(sol));
			}
		}
		return this.__validated;
	}

	validateSolution(solution: number[]) {
		const sol = new Solution(...solution);

		if (!this.hasDigits(sol.solution, this.selected))
			return sol;

		const without = this.withoutDigits(sol.solution, this.selected);

		if (this.digitsAvailable(without, this.available))
			sol.isValid = true;

		return sol;
	}

	hasDigits(solution: number[], digits: number[]) {
		for (const digit of digits) {
			if (!solution.includes(digit))
				return false;
		}
		return true;
	}

	withoutDigits(solution: number[], digits: number[]) {
		const res = [...solution]
		for (const digit of digits) {
			const index = solution.findIndex(d => d === digit)
			res.splice(index);
		}
		return res;
	}

	digitsAvailable(solution: number[], digits: number[]) {
		for (const s of solution) {
			if (!digits.includes(s))
				return false;
		}
		return true;
	}
}
