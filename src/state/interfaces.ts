import { RuleTypes } from "../model/rule";


export interface SquareState {
	solution: number;
	group: number;
	selected: number;
	excluded: number[];
	isGroupKey?: boolean;
	compareRight?: number;
	compareDown?: number;
}

export interface GroupState {
	rule: RuleTypes;
	value?: number;
	color: string;
	solutions?: number[][];
}

export interface PuzzleState {
	size: number;
	squares: SquareState[];
	groups: GroupState[];
	hoverGroup: number;
}

export class RawPuzzleData {
	squareValues: number[] = [];
	squareGroups: number[] = [];
	groupRules: RuleTypes[] = [];
	groupValues: number[] = [];
}

export interface XY {
	x: number,
	y: number
}

export interface Borders<T> {
	left: T | null,
	top: T | null,
	right: T | null,
	bottom: T | null,
}
