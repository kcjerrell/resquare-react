import React from 'react';
import './App.css';
import { usePuzzle } from './state/selectors';
import { loadPuzzle } from './state/puzzleSlice';
import { loadSample } from './state/loader';
import PuzzleComponent from './components/Puzzle';

function App() {
  const { dispatch, state: puzzleState } = usePuzzle();

  // const puzzle = puzzleState.size > 0 ? new Puzzle(puzzleState, dispatch) : null;

  const onLoadClick = () => {
    dispatch(loadPuzzle(loadSample(4)));
  }

  return (
    <div className="App">
      {puzzleState.size > 0 &&
        <PuzzleComponent/>
      }

      {puzzleState.size === 0 &&
        <button onClick={onLoadClick}>Load Puzzle</button>
      }
    </div>
  );
}

export default App;
