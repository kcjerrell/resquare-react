import React from 'react';
import styled from 'styled-components';
import { Puzzle } from '../model/puzzle';
import { PuzzleState } from '../state/interfaces';
import { byRows, selectXY } from '../utilities/array';
import SquareComponent from './Square';

interface PuzzleProps {
	state: PuzzleState;
	puzzle: Puzzle;
}

/**
 * Renders the Puzzle component
 * Does not require any props
 * It will render the puzzle from the state, via usePuzzle()
 *
 * @return {*}
 */
function PuzzleComponent(props: PuzzleProps) {
	const { state, puzzle } = props;

	const rows = Array.from(byRows(puzzle.squares, puzzle.size));

	return (
		<PuzzleContainer size={state.size}>
			{rows.map((row, ri) => (
				<div className="puzzle-row" key={ri}>
					{row.map((square, si) => {
						const squareState = selectXY(state.squares, puzzle.size, { x: square.x, y: square.y });
						return (
							<SquareComponent key={si} square={square} state={squareState} />
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
	cursor: default;

	width: 90vh;
	height: 90vh;

	margin: 1rem;

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
