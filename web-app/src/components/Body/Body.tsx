import React, { Dispatch, useState } from 'react';
import Button from '../../_shared/components/Button';
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
  const [forceStart, setForceStart] = useState(false);

  const onBothClick = (e: React.MouseEvent) => {
    // When the both button is clicked, forces timer to start
    e.preventDefault();
    setForceStart(true);
  };

  return (
    <main>
      <div className="timers-box">
        <Timer
          enrageTimer={enrageTimer}
          fightStarted={fightStarted}
          setEnrageTimer={setEnrageTimer}
          time={TIMER.ENRAGE}
          variant={TIMER_TYPE.ENRAGE}
          key={TIMER_TYPE.ENRAGE}
        />
        <Timer
          enrageTimer={enrageTimer}
          fightStarted={fightStarted}
          forceStart={forceStart}
          setEnrageTimer={setEnrageTimer}
          setForceStart={setForceStart}
          time={TIMER.METEOR}
          variant={TIMER_TYPE.METEOR}
          key={TIMER_TYPE.METEOR}
        />
        <Timer
          enrageTimer={enrageTimer}
          fightStarted={fightStarted}
          forceStart={forceStart}
          setEnrageTimer={setEnrageTimer}
          setForceStart={setForceStart}
          time={TIMER.TILE}
          variant={TIMER_TYPE.TILE}
          key={TIMER_TYPE.TILE}
        />
        <p className="both-button-caption">
          Click this button if the meteor dropped and tile broke at the same
          time
        </p>
        <Button
          className="both-button"
          label="Both"
          onClick={onBothClick}
          disabled={!fightStarted}
        />
      </div>
      <p className="message">
        If you want to say thanks, feel free to subscribe to my friend{' '}
        <a href="https://www.twitch.tv/aiyulol">Aiyulol</a> at{' '}
        <a href="https://www.twitch.tv/aiyulol">
          https://www.twitch.tv/aiyulol
        </a>
      </p>
    </main>
  );
};

export default Body;
