import React, { Dispatch } from 'react';
import Timer from '../../_shared/components/Timer';
import { TIMER, TIMER_TYPE } from '../../_shared/constants/timer';
import './styles.scss';

interface IBody {
  fightStarted: boolean;
  enrageTimer: number;
  setEnrageTimer: Dispatch<number>;
}

const Body: React.FC<IBody> = ({
  enrageTimer,
  fightStarted,
  setEnrageTimer,
}) => {
  return (
    <main>
      <div className="timers-box">
        <Timer
          enrageTimer={enrageTimer}
          fightStarted={fightStarted}
          setEnrageTimer={setEnrageTimer}
          time={TIMER.ENRAGE}
          variant={TIMER_TYPE.ENRAGE}
        />
        <Timer
          enrageTimer={enrageTimer}
          fightStarted={fightStarted}
          setEnrageTimer={setEnrageTimer}
          time={TIMER.METEOR}
          variant={TIMER_TYPE.METEOR}
        />
        <Timer
          enrageTimer={enrageTimer}
          fightStarted={fightStarted}
          setEnrageTimer={setEnrageTimer}
          time={TIMER.TILE}
          variant={TIMER_TYPE.TILE}
        />
      </div>
    </main>
  );
};

export default Body;
