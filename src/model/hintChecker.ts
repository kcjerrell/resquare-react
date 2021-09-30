import { Group } from "./group";

export class Solution {
	solution: number[];
	isValid: boolean;

	constructor(...items: number[]) {
		this.solution = items;
		this.isValid = false;
	}
}

interface ValidateSolutionGroup {
	selected: number[];
	available: number[];
}

export function validateSolution(solution: number[], group: ValidateSolutionGroup) {
	const sol = new Solution(...solution);

	if (!hasDigits(sol.solution, group.selected))
		return sol;

	const without = withoutDigits(sol.solution, group.selected);

	if (digitsAvailable(without, group.available))
		sol.isValid = true;

	return sol;
}

export function hasDigits(solution: number[], digits: number[]) {
	for (const digit of digits) {
		if (!solution.includes(digit))
			return false;
	}
	return true;
}

export function withoutDigits(solution: number[], digits: number[]) {
	const res = [...solution]
	for (const digit of digits) {
		const index = solution.findIndex(d => d === digit)
		res.splice(index);
	}
	return res;
}

export function digitsAvailable(solution: number[], digits: number[]) {
	for (const s of solution) {
		if (!digits.includes(s))
			return false;
	}
	return true;
}
