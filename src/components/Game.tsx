import React from 'react';
import styled from 'styled-components';
import { Puzzle } from '../model/puzzle';
import { usePuzzle } from '../state/selectors';
import Hints from './Hints';
import PuzzleComponent from './Puzzle';

function GameComponent() {
	const { state, dispatch } = usePuzzle();
	const puzzle = new Puzzle(state, dispatch);

	const displayHints = state.hoverGroup >= 0 && puzzle.groups[state.hoverGroup].solutions != null;

	return (
		<GameContainer>
			<PuzzleComponent state={state} puzzle={puzzle} />

			{displayHints &&
				<Hints group={puzzle.groups[state.hoverGroup]}/>
			}
		</GameContainer>
	);
}

export default GameComponent;

const GameContainer = styled.div`
	display: flex;
	flex-direction: row;
`;
