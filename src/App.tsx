import React from 'react';
import './App.css';
import { usePuzzle } from './state/selectors';
import { loadPuzzle } from './state/puzzleSlice';
import { loadSample } from './puzzles/samples';
import Game from './components/Game';

function App() {
  const { dispatch, state: puzzleState } = usePuzzle();

  // const puzzle = puzzleState.size > 0 ? new Puzzle(puzzleState, dispatch) : null;

  const onLoadClick = (size: number) => {
    dispatch(loadPuzzle(loadSample(size)));
  }

  return (
    <div className="App">
      {puzzleState.size > 0 &&
        <Game />
      }

      {puzzleState.size === 0 && [4, 5, 6, 7, 8, 9].map(s => {
        return (
          <button key={s} onClick={e => onLoadClick(s)}>Load Puzzle {s}</button>
        )
      })
      }
    </div>
  );
}

export default App;
