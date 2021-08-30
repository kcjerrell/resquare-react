import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { RootState } from "../app/store";
import { selectXY } from "../utilities/array";

export const selectPuzzle = (state: RootState) => state.puzzle;

export const selectSquare = (x: number, y: number) => {
	return (state: RootState) => {
		return selectXY(state.puzzle.squares, state.puzzle.size, { x, y });
	}
}

export const selectSize = (state: RootState) => state.puzzle.size;

export const usePuzzle = () => {
	const state = useSelector(selectPuzzle);
	const dispatch = useAppDispatch();

	return { state, dispatch };
}
