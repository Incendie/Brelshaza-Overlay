import React, { useState } from 'react';
import Timer from '../../_shared/components/Timer';
import {
  ENRAGE_TIMER,
  METEOR_TIMER,
  TILE_TIMER,
} from '../../_shared/constants/timer';
import './styles.scss';

interface IBody {
  fightStarted: boolean;
  onStartReset: (e: React.MouseEvent) => void;
}

const Body: React.FC<IBody> = ({ fightStarted }) => {
  return (
    <main>
      <div className="timers-box">
        <Timer
          variant="enrage"
          fightStarted={fightStarted}
          time={ENRAGE_TIMER}
        />
        <Timer
          fightStarted={fightStarted}
          variant="blue-meteor"
          time={METEOR_TIMER}
        />
        <Timer
          fightStarted={fightStarted}
          variant="broken-tile"
          time={TILE_TIMER}
        />
      </div>
    </main>
  );
};

export default Body;
