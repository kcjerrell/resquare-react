import { GroupState } from "../state/interfaces";
import { Rule } from "./rule";
import { Square } from "./square";

export class Group {
	rule: Rule;
	squares: Square[] = [];
	color: string;

	constructor(group: GroupState) {
		this.rule = new Rule(group.rule, group.value);
		this.color = group.color;
	}
}
