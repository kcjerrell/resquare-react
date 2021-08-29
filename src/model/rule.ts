export enum RuleTypes {
	None = 0,
	Equals,
	Add,
	Subtract,
	Multiply,
	Divide,
	Odd,
	Even,
	Compare,
	Straight,
}

export function ruleType(rule: string) {
	switch (rule) {
		case '_':
			return RuleTypes.None;
		case '=':
			return RuleTypes.Equals;
		case '+':
			return RuleTypes.Add;
		case '-':
			return RuleTypes.Subtract;
		case '*':
		case 'x':
			return RuleTypes.Multiply;
		case '/':
			return RuleTypes.Divide;
		case 'o':
			return RuleTypes.Odd;
		case 'e':
			return RuleTypes.Even;
		case '<':
			return RuleTypes.Compare;
		case 's':
			return RuleTypes.Straight;
		default:
			return RuleTypes.None;
	}
}

export function ruleToString(rule: RuleTypes, display = false) {
	switch (rule) {
		case RuleTypes.None:
			return display ? '' : '_';
		case RuleTypes.Equals:
			return '=';
		case RuleTypes.Add:
			return '+';
		case RuleTypes.Subtract:
			return '-';
		case RuleTypes.Multiply:
			return display ? 'x' : '*';
		case RuleTypes.Divide:
			return display ? '÷' : '/';
		case RuleTypes.Odd:
			return display ? 'Odd' : 'o';
		case RuleTypes.Even:
			return display ? 'Even' : 'e';
		case RuleTypes.Compare:
			return '<>';
		case RuleTypes.Straight:
			return display ? 's' : 'Straight';
	}
}

export const hintableRules = [
	RuleTypes.Equals,
	RuleTypes.Add,
	RuleTypes.Subtract,
	RuleTypes.Multiply,
	RuleTypes.Divide,
	RuleTypes.Straight
]

/**
 * Represents a rule for a square groups.
 *
 * Currently is just a data class, but eventually will provide related support
 * for solving and hinting
 */
export class Rule {
	type: RuleTypes;
	value: number;

	constructor(type: RuleTypes, value: number = 0) {
		this.type = type;
		this.value = value;
	}

	toLabel() {
		return `${this.value > 0 ? this.value : ''}${ruleToString(this.type, true)}`;
	}

	formatHint(solution: number[]) {
		return `${solution.join(` ${ruleToString(this.type, true)} `)} = ${this.value}`;
	}

	static fromCode(code: string) {
		const type = ruleType(code);
		const value = parseInt(code.slice(1));

		return new Rule(type, value);
	}
}
