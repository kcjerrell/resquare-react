import React from 'react';
import { loadSample } from '../puzzles/samples';
import { selectByY } from '../utilities/array';
import { range } from '../utilities/util';
import { PuzzleSolver } from './solver';

function SolverTester() {
	const puzzleData = loadSample(6);

	const solver = new PuzzleSolver(puzzleData);
	const rows = Array.from(range(solver.size));

	solver.proc();

	return (
		<div>
			{rows.map(y => {
				const squares = Array.from(selectByY(solver.squares, solver.size, y));
				squares.map(sq => {
					<br/>
				})
			})}
		</div>
	)
}

export default SolverTester;
