import React, { Dispatch, useEffect, useState } from 'react';
import { TIMER_TYPE } from '../../constants/timer';
import Button from '../Button';
import image from '../../../assets/copy.png';
import './styles.scss';

interface ITimer {
  fightStarted: boolean;
  time: number;
  variant: string;
  enrageTimer: number;
  setEnrageTimer: Dispatch<number>;
}

const Timer: React.FC<ITimer> = ({
  fightStarted,
  time,
  variant,
  enrageTimer,
  setEnrageTimer,
}) => {
  const [timeLeft, setTimeLeft] = useState(time);
  const [start, setStart] = useState(
    variant === TIMER_TYPE.ENRAGE && fightStarted
  );
  const [showEnrageTimeLeft, setShowEnrageTimeLeft] = useState(false);

  const formatTimeLeft = (timeRemaining: number) => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = Math.floor(timeRemaining % 60);
    const minutesStr =
      minutes < 10 ? `0${minutes.toString()}` : minutes.toString();
    const secondsStr =
      seconds < 10 ? `0${seconds.toString()}` : seconds.toString();

    return `${minutesStr}:${secondsStr}`;
  };

  const formatEnrageTimeLeft = () => {
    if (enrageTimer && variant !== TIMER_TYPE.ENRAGE)
      return formatTimeLeft(timeLeft + enrageTimer);
  };

  const onTimerClick = (e: React.MouseEvent) => {
    // If the button next to the timer is clicked
    setShowEnrageTimeLeft(true);
    // Reset the time
    if (fightStarted) setTimeLeft(time);

    // Start the timer if it is stopped and the fight has already begun
    if (!start && fightStarted) setStart(true);
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
    if (variant === TIMER_TYPE.ENRAGE && setEnrageTimer)
      setEnrageTimer(timeLeft);
  }, [setEnrageTimer, timeLeft, variant]);

  useEffect(() => {
    // Start the timer automatically if it is the enrage timer
    setStart(variant === TIMER_TYPE.ENRAGE && fightStarted);
  }, [fightStarted, time, variant]);

  useEffect(() => {
    if (!fightStarted) {
      setShowEnrageTimeLeft(false);
      setTimeLeft(time);
    }
  }, [fightStarted, time]);

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

  const timeLeftVerbiage = () => {
    switch (variant) {
      case TIMER_TYPE.ENRAGE:
        return 'Enrage Timer -';
      case TIMER_TYPE.METEOR:
        return 'Next blue meteor in';
      case TIMER_TYPE.TILE:
        return 'Tile will regenerate in';
      default:
        break;
    }
  };

  const enrageTimeLeftVerbiage = () => {
    switch (variant) {
      case TIMER_TYPE.METEOR:
        return 'or at Enrage Timer of';
      case TIMER_TYPE.TILE:
        return 'or at Enrage Timer of';
      default:
        break;
    }
  };

  const onCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (fightStarted) {
      if (variant === TIMER_TYPE.ENRAGE) {
        await navigator.clipboard.writeText(
          `${timeLeftVerbiage()} ${formatTimeLeft(timeLeft)}`
        );
      } else if (start) {
        await navigator.clipboard.writeText(
          `${timeLeftVerbiage()} ${formatTimeLeft(
            timeLeft
          )} ${enrageTimeLeftVerbiage()} ${formatEnrageTimeLeft()}`
        );
      }
    }
  };

  const disabled = !(fightStarted && (variant === TIMER_TYPE.ENRAGE || start));

  return (
    <div className={`${variant}-timer-container`}>
      <div
        className={`timer-timeLeft-container ${disabled ? 'disabled' : ''}`}
        onClick={onCopy}
      >
        <p className="timer-left">
          <span>{timeLeftVerbiage()}</span>
          <span>{formatTimeLeft(timeLeft)}</span>
        </p>
        {showEnrageTimeLeft && variant !== TIMER_TYPE.ENRAGE && (
          <p className="enrage-timer-left">
            <span>{enrageTimeLeftVerbiage()}</span>
            <span>{formatEnrageTimeLeft()}</span>
          </p>
        )}
        <button className="copy" type="button" disabled={disabled}>
          <img src={image} alt="Copy icon" />
        </button>
      </div>
      {variant !== TIMER_TYPE.ENRAGE && (
        <Button
          className={`${variant}-button`}
          label={formatName()}
          onClick={onTimerClick}
          disabled={!fightStarted}
        />
      )}
    </div>
  );
};

export default Timer;
