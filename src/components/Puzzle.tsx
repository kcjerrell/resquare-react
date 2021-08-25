import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Puzzle } from '../model/puzzle';
import { PuzzleState } from '../state/interfaces';
import { selectPuzzle, usePuzzle } from '../state/selectors';
import { byRows, getXY, selectXY } from '../utilities/array';
import SquareComponent from './Square';

interface PuzzleProps {
	state: PuzzleState;
}

function PuzzleComponent() {
	const { state, dispatch } = usePuzzle();
	const puzzle = new Puzzle(state, dispatch);

	const rows = Array.from(byRows(puzzle.squares, puzzle.size));

	return (
		<PuzzleContainer size={state.size}>
			{rows.map(row => (
				<div className="puzzle-row">
					{row.map(square => {
						const squareState = selectXY(state.squares, puzzle.size, { x: square.x, y: square.y });
						return (
							<SquareComponent square={square} state={squareState} />
						);
					})}
				</div>
			))}
		</PuzzleContainer>
	);
}

const PuzzleContainer = styled.div<{ size: number }>`
	background: #FF222222;
	border: 2px black solid;
	margin: auto;
	width: 90vh;
	height: 90vh;
	cursor: default;

	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: stretch;

	.puzzle-row {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		flex: 1 0 ${props => Math.floor(100 / props.size)}%;
	}

	.puzzle-row>div {
		flex: 1 0 ${props => Math.floor(100 / props.size)}%;
	}
`;

export default PuzzleComponent;
