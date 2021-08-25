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
			return '<';
	}
}

export class Rule {
	type: RuleTypes;
	value: number;

	/**
	 *
	 */
	constructor(type: RuleTypes, value: number = 0) {
		this.type = type;
		this.value = value;
	}

	toLabel() {
		return `${this.value > 0 ? this.value : ''}${ruleToString(this.type, true)}`;
	}

	static fromCode(code: string) {
		let type: RuleTypes;

		switch (code[0]) {
			case '_':
				type = RuleTypes.None;
				break;
			case '=':
				type = RuleTypes.Equals;
				break;
			case '+':
				type = RuleTypes.Add;
				break;
			case '-':
				type = RuleTypes.Subtract;
				break;
			case '*':
				type = RuleTypes.Multiply;
				break;
			case '/':
				type = RuleTypes.Divide;
				break;
			case 'o':
				type = RuleTypes.Odd;
				break;
			case 'e':
				type = RuleTypes.Even;
				break;
			case '<':
				type = RuleTypes.Compare;
				break;
			default:
				type = RuleTypes.None;
				break;
		}

		return new Rule(type, parseInt(code.slice(1)));
	}
}
