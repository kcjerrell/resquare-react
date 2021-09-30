import { GroupState } from "../state/interfaces";
import { Solution, validateSolution } from "./hintChecker";
import { hintableRules, Rule, RuleTypes } from "./rule";
import { Square } from "./square";

/**
 * Represents a group of squares with a shared rule.
 *
 * It is generated dynamically by the puzzle helper class on each state update.
 * Because this is generated anew every time there is a state update, it made sense (at the time)
 * to set "selected" and "available" as squares are added to the group.
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
				this.__validated = this.solutions.map(sol => validateSolution(sol, this));
			}
		}
		return this.__validated;
	}
}
