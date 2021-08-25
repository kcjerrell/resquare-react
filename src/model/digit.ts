export class Digit {

}

export interface DigitState {
	value: number;
	isSelected: boolean;
	isExcluded: boolean;

}

export function initDigits(size: number): DigitState[] {
	const digits = [];
	for (let i = 0; i < size; i++) {
		const digit = {
			value: i + 1,
			isSelected: false,
			isExcluded: false
		};
		digits.push(digit);
	}
	return digits;
}
