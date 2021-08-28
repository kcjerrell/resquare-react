import { GroupState } from "../state/interfaces";
import { Rule, RuleTypes } from "./rule";
import { Square } from "./square";

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

	constructor(groupState: GroupState) {
		this.state = groupState;
		this.rule = new Rule(groupState.rule, groupState.value);
		this.color = groupState.color;
	}

	addSquare(square: Square) {
		this.squares.push(square);
	}
}
