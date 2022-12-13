import React, { useState } from 'react';
import Body from './components/Body';
import Header from './components/Header';
import './App.scss';
import { TIMER } from './_shared/constants/timer';

function App() {
  const [fightStarted, setFightStarted] = useState(false);
  const [enrageTimer, setEnrageTimer] = useState(TIMER.ENRAGE);

  const onStartReset = (e: React.MouseEvent) => {
    // Start button starts the enrage timer, Reset will reset the fight and stop all timers at initial state
    e.preventDefault();

    // Reset button clicked
    if (fightStarted) setEnrageTimer(TIMER.ENRAGE);

    // Flip the fight started flag when button is clicked
    setFightStarted(prev => !prev);
  };

  return (
    <div className="App">
      <Header onStartReset={onStartReset} fightStarted={fightStarted} />
      <Body
        enrageTimer={enrageTimer}
        fightStarted={fightStarted}
        setEnrageTimer={setEnrageTimer}
      />
    </div>
  );
}

export default App;
