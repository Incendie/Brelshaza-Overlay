import React, { useState } from 'react';
import Body from './components/Body';
import Header from './components/Header';
import './App.scss';
import {
  ENRAGE_TIMER,
  METEOR_TIMER,
  TILE_TIMER,
} from './_shared/constants/timer';

function App() {
  const [fightStarted, setFightStarted] = useState(false);

  const onStartReset = (e: React.MouseEvent) => {
    // Start button starts the enrage timer, Reset will reset the fight and stop all timers at initial state
    e.preventDefault();
    setFightStarted(prev => !prev);
  };

  return (
    <div className="App">
      <Header onStartReset={onStartReset} fightStarted={fightStarted} />
      <Body fightStarted={fightStarted} onStartReset={onStartReset} />
    </div>
  );
}

export default App;
