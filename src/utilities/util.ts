import { Borders } from "../state/interfaces";

/**
 * Like Python's range(), returns a generator that iterates from 0 to n - 1
 * @param n the number of numbers to return
 */
export function* range(n: number) {
	for (let i = 0; i < n; i++) {
		yield i;
	}
}

/**
 * Returns a string that can be used for css attributes that take 4
 * measurements, for instance border-size, margin, padding, corner-radius, etc
 * @param borders a Borders object consisting of true/false values
 * @param trueValue the desired output value matching true
 * @param falseValue the desired output value matching false
 * @param suffix will be appended to the end of each item in the string (ie px,
 * vh, vw, rem, etc)
 * @returns a css value string, interpolated with values matching the provided
 * borders object
 */
export function getBorderString<T>(borders: Borders<boolean>, trueValue: T, falseValue: T, suffix: string = '') {
	const top = borders.top ? trueValue : falseValue;
	const right = borders.right ? trueValue : falseValue;
	const bottom = borders.bottom ? trueValue : falseValue;
	const left = borders.left ? trueValue : falseValue;

	return `${top}${suffix} ${right}${suffix} ${bottom}${suffix} ${left}${suffix}`
}

// export function getBorderColors(borders: Borders<boolean>, trueValue: string, falseValue: string) {
// 	const col = (n: number | null) => n && n >= 2 ? '#000000FF' : '#00000099';

// 	return `${col(borders.top)} ${col(borders.right)} ${col(borders.bottom)} ${col(borders.left)}`

// }
