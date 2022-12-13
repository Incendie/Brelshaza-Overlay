import React, { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import './styles.scss';

interface ITimer {
  fightStarted: boolean;
  variant: string;
  time: number;
}

const Timer: React.FC<ITimer> = ({ fightStarted, variant, time }) => {
  const ref = useRef(null);
  const [timeLeft, setTimeLeft] = useState(time);
  const [start, setStart] = useState(variant === 'enrage' && fightStarted);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = Math.floor(timeLeft % 60);
    const minutesStr =
      minutes < 10 ? `0${minutes.toString()}` : minutes.toString();
    const secondsStr =
      seconds < 10 ? `0${seconds.toString()}` : seconds.toString();

    console.log({ minutes, seconds, minutesStr, secondsStr });

    return `${minutesStr}:${secondsStr}`;
  };

  const onTimerClick = (e: React.MouseEvent) => {
    // If the button next to the timer is clicked

    // Reset the time
    if (fightStarted) setTimeLeft(time);

    // Start the timer if it is stopped
    if (!start) setStart(true);

    // // Run the onClick if it is the
    // if (onClick) onClick(e);
  };

  const formatName = () => {
    const nameArr = variant.split('-');
    const newNameArr = nameArr.map(
      word => word[0].toUpperCase() + word.substring(1)
    );
    const formattedName = newNameArr.join(' ');

    return formattedName;
  };

  useEffect(() => {
    // Start the timer automatically if it is the enrage timer
    setStart(variant === 'enrage' && fightStarted);
  }, [variant, fightStarted]);

  useEffect(() => {
    // Main countdown logic
    const timerInterval = setInterval(() => {
      if (start) {
        setTimeLeft(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timerInterval);
            return 0;
          }

          return prevTime - 1;
        });
      }
    }, 1000);

    if (!start) clearInterval(timerInterval);

    return () => clearInterval(timerInterval);
  }, [start, timeLeft]);

  return (
    <div className="timer-container">
      <p ref={ref} className={`${variant}-timer`}>
        {formatTime()}
      </p>
      {variant !== 'enrage' && (
        <Button
          className={`${variant}-button`}
          label={formatName()}
          onClick={onTimerClick}
        />
      )}
    </div>
  );
};

export default Timer;
