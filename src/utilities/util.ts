import { Borders } from "../state/interfaces";

export function* range(n: number) {
	for (let i = 0; i < n; i++) {
		yield i;
	}
}

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
