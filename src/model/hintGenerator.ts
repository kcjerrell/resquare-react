import { rangeAB } from "../utilities/util";
import { RuleTypes } from "./rule";

export interface GenerateHintsOpts {
	ruleType: RuleTypes;
	value: number;
	nSquares: number;
	size: number;
	span: number;
}

export function generateHints(opts: GenerateHintsOpts): number[][] {
	const { ruleType, value, nSquares, size, span } = opts;
	const digits = Array.from(rangeAB(1, size + 1));

	const combs = span > 1 ? combosRep(digits, nSquares, span) : combos(digits, nSquares);

	switch (ruleType) {
		case RuleTypes.Equals:
			return [[value]];
		case RuleTypes.Add:
			return Array.from(getAddHints(combs, value));
		case RuleTypes.Subtract:
			return Array.from(getSubtractHints(combs, value));
		case RuleTypes.Multiply:
			return Array.from(getMultiplyHints(combs, value));
		case RuleTypes.Divide:
			return Array.from(getDivideHints(combs, value));
		case RuleTypes.Straight:
			return Array.from(getStraightHints(combs, value));
		default:
			return [];
	}
}

function* getAddHints(combs: Generator<number[], any, unknown>, value: number) {
	for (const c of combs) {
		if (c.reduce((p, n, i) => p + n, 0) === value)
			yield c;
	}
}

function* getMultiplyHints(combs: Generator<number[], any, unknown>, value: number) {
	for (const c of combs) {
		if (c.reduce((p, n, i) => p * n, 1) === value)
			yield c;
	}
}

function* getSubtractHints(combs: Generator<number[], any, unknown>, value: number) {
	for (const c of combs) {
		if (Math.max(...c) - Math.min(...c) === value)
			yield c.sort((a, b) => b - a);
	}
}

function* getDivideHints(combs: Generator<number[], any, unknown>, value: number) {
	for (const c of combs) {
		if (Math.max(...c) / Math.min(...c) === value)
			yield c.sort((a, b) => b - a);
	}
}

function* getStraightHints(combs: Generator<number[], any, unknown>, value: number) {
	for (const c of combs) {
		if (c.length === (new Set(c)).size) {
			if (Math.max(...c) - Math.min(...c) === c.length + 1)
				yield c;
		}
	}
}

export function* combos(digits: number[], length: number): Generator<number[]> {
	for (const digit of digits) {
		if (length === 1) {
			yield [digit];
		}

		else {
			const remainingDigits = digits.filter(d => d > digit);

			for (const rest of combos(remainingDigits, length - 1)) {
				yield [digit, ...rest];
			}
		}
	}
}

interface DigitCount {
	[index: number]: number
}

export function* combosRep(digits: number[], length: number, span: number): Generator<number[]> {
	function* inner(availDigits: DigitCount, length: number, min: number): Generator<number[]> {
		for (const digit of digits) {
			if (availDigits[digit] === 0 || digit < min)
				continue;

			if (length === 1) {
				yield [digit];
			}

			else {
				availDigits[digit] -= 1;

				for (const rest of inner(availDigits, length - 1, digit)) {
					yield [digit, ...rest];
				}

				availDigits[digit] += 1;
			}
		}
	}

	const availDigits: DigitCount = {};
	for (const digit of digits) {
		availDigits[digit] = span;
	}

	for (const res of inner(availDigits, length, 1)) {
		yield res;
	}
}
