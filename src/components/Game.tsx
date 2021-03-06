import React from 'react';
import styled from 'styled-components';
import { Puzzle } from '../model/puzzle';
import { usePuzzle } from '../state/selectors';
import Hints from './Hints';
import PuzzleComponent from './Puzzle';

function GameComponent() {
	const { state, dispatch } = usePuzzle();
	const puzzle = new Puzzle(state, dispatch);

	return (
		<GameContainer>
			<PuzzleComponent state={state} puzzle={puzzle} />
			<Hints group={puzzle.groups[state.hoverGroup]} />
		</GameContainer>
	);
}

export default GameComponent;

const GameContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-start;
	margin: auto;
`;
