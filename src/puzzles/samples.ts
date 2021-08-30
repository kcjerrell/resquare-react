import { ruleType } from "../model/rule";
import { RawPuzzleData } from "../state/interfaces";
import { RuleTypes as RT } from '../model/rule';

export function loadSample4(): RawPuzzleData {
	const squareValues = [
		1, 2, 4, 3,
		3, 1, 2, 4,
		4, 3, 1, 2,
		2, 4, 3, 1
	];

	const squareGroups = [
		0, 0, 0, 1,
		2, 3, 0, 1,
		2, 3, 1, 1,
		4, 4, 1, 1
	];

	//	const groupRules = "*16 >0 >0 *3 +6";
	const groupRules = [RT.Multiply, RT.Compare, RT.Compare, RT.Multiply, RT.Add];
	const groupValues = [16, 0, 0, 3, 6];

	return { squareValues, squareGroups, groupRules, groupValues };
}

export function loadSample6(): RawPuzzleData {
	const squareValues = [
		3, 1, 4, 6, 5, 2,
		5, 3, 2, 4, 6, 1,
		1, 2, 3, 5, 4, 6,
		6, 5, 1, 3, 2, 4,
		2, 4, 6, 1, 3, 5,
		4, 6, 5, 2, 1, 3,
	];

	const squareGroups = [
		0, 1, 2, 3, 3, 4,
		0, 1, 5, 6, 7, 4,
		8, 8, 5, 6, 7, 9,
		10, 11, 12, 12, 7, 9,
		10, 11, 11, 13, 13, 14,
		15, 15, 16, 16, 17, 14
	];

	const groupInfo = "+8 x3 =4 -1 x2 -1 x20 x48 -1 +10 x12 +15 x3 +4 -2 -2 +7 =1";
	const { groupRules, groupValues } = extractGroups(groupInfo);


	return { squareValues, squareGroups, groupRules, groupValues };
}

const sample5 = {
	squareValues: [
		1, 2, 3, 4, 5,
		2, 3, 4, 5, 1,
		3, 4, 5, 1, 2,
		4, 5, 1, 2, 3,
		5, 1, 2, 3, 4,
	],
	squareGroups: [
		0, 0, 0, 0, 0,
		0, 0, 0, 0, 0,
		0, 0, 0, 0, 0,
		0, 0, 0, 0, 0,
		0, 0, 0, 0, 0,
	],
	groupInfo: "_"
}

const sample7 = {
	squareValues: [
		1, 2, 3, 4, 5, 6, 7,
		2, 3, 4, 5, 6, 7, 1,
		3, 4, 5, 6, 7, 1, 2,
		4, 5, 6, 7, 1, 2, 3,
		5, 6, 7, 1, 2, 3, 4,
		6, 7, 1, 2, 3, 4, 5,
		7, 1, 2, 3, 4, 5, 6,
	],
	squareGroups: [
		0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0,
	],
	groupInfo: "_"
}

const sample8 = {
	squareValues: [
		1, 2, 3, 4, 5, 6, 7, 8,
		2, 3, 4, 5, 6, 7, 8, 1,
		3, 4, 5, 6, 7, 8, 1, 2,
		4, 5, 6, 7, 8, 1, 2, 3,
		5, 6, 7, 8, 1, 2, 3, 4,
		6, 7, 8, 1, 2, 3, 4, 5,
		7, 8, 1, 2, 3, 4, 5, 6,
		8, 1, 2, 3, 4, 5, 6, 7,
	],
	squareGroups: [
		0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0,
	],
	groupInfo: "_"
}

const sample9 = {
	squareValues: [
		1, 2, 3, 4, 5, 6, 7, 8, 9,
		2, 3, 4, 5, 6, 7, 8, 9, 1,
		3, 4, 5, 6, 7, 8, 9, 1, 2,
		4, 5, 6, 7, 8, 9, 1, 2, 3,
		5, 6, 7, 8, 9, 1, 2, 3, 4,
		6, 7, 8, 9, 1, 2, 3, 4, 5,
		7, 8, 9, 1, 2, 3, 4, 5, 6,
		8, 9, 1, 2, 3, 4, 5, 6, 7,
		9, 1, 2, 3, 4, 5, 6, 7, 8,
	],
	squareGroups: [
		0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0,
	],
	groupInfo: "_"
}

export function loadSample(size: number): RawPuzzleData {
	let sample;
	switch (size) {
		case 4:
			return loadSample4();
		case 5:
			sample = sample5;
			break;
		case 6:
			return loadSample6();
		case 7:
			sample = sample7;
			break;
		case 8:
			sample = sample8;
			break;
		case 9:
			sample = sample9;
			break;
		default:
			throw new Error("invalid puzzle size");
	}

	const { squareValues, squareGroups, groupInfo } = sample;
	const { groupRules, groupValues } = extractGroups(groupInfo);
	return { squareValues, squareGroups, groupRules, groupValues };
}

function extractGroups(groupInfo: string) {
	const groups = groupInfo.split(' ');

	const groupRules = groups.map(g => ruleType(g[0]));
	const groupValues = groups.map(g => parseInt(g.slice(1)));

	return { groupRules, groupValues };
}
