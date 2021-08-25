import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { byGroup, selectByXY, selectXY } from "../utilities/array";
import { PuzzleState, RawPuzzleData } from "./interfaces";
import { buildPuzzleState } from "./loader";

export interface DigitPayload {
	x: number,
	y: number,
	digit: number
}

const initialState: PuzzleState = {
	size: 0,
	squares: [],
	groups: [],
}

export const puzzleSlice = createSlice({
	name: 'puzzle',
	initialState,
	reducers: {

		loadPuzzle: (state, action: PayloadAction<RawPuzzleData>) => {
			return buildPuzzleState(action.payload);
		},

		selectDigit: (state, action: PayloadAction<DigitPayload>) => {
			const { x, y, digit } = action.payload;

			const cross = Array.from(selectByXY(state.squares, state.size, { x, y }, true));

			for (const crossSquare of cross) {
				if (crossSquare.selected === digit)
					crossSquare.selected = 0;
			}

			const square = selectXY(state.squares, state.size, { x, y });
			square.selected = digit;
			square.excluded = square.excluded.filter(d => d !== digit);
		},

		excludeDigit: (state, action: PayloadAction<DigitPayload>) => {
			const { x, y, digit } = action.payload;

			const square = selectXY(state.squares, state.size, { x, y });

			if (square.excluded.includes(digit)) {
				square.excluded = square.excluded.filter(d => d !== digit);
			}
			else {
				square.excluded.push(digit);
			}
		},

		groupExclude: (state, action: PayloadAction<DigitPayload>) => {
			const { x, y, digit } = action.payload;
			const originSquare = selectXY(state.squares, state.size, { x, y });
			const group = originSquare.group;
			const value = !originSquare.excluded.includes(digit);

			for (const square of byGroup(state.squares, group)) {
				const hasDigit = square.excluded.includes(digit);

				if (value && !hasDigit) {
					square.excluded.push(digit);
				}
				if (!value && hasDigit) {
					square.excluded = square.excluded.filter(d => d !== digit);
				}
			}
		},
	}
});

export const { loadPuzzle, selectDigit, excludeDigit, groupExclude } = puzzleSlice.actions;

export default puzzleSlice.reducer;
