import React, { Dispatch, useCallback, useEffect, useState } from 'react';
import { TIMER_TYPE } from '../../constants/timer';
import Button from '../Button';
import image from '../../../assets/copy.png';
import './styles.scss';

interface ITimer {
  fightStarted: boolean;
  forceStart?: boolean;
  time: number;
  variant: string;
  enrageTimer: number;
  setEnrageTimer: Dispatch<number>;
  setForceStart?: Dispatch<boolean>;
}

// Timer component - has reset button, countdown text, copy to clipboard
const Timer: React.FC<ITimer> = ({
  enrageTimer,
  fightStarted,
  forceStart,
  setEnrageTimer,
  setForceStart,
  time,
  variant,
}) => {
  const [timeLeft, setTimeLeft] = useState(time);
  const [start, setStart] = useState(
    variant === TIMER_TYPE.ENRAGE && fightStarted
  );
  const [showEnrageTimeLeft, setShowEnrageTimeLeft] = useState(false);

  const formatTimeLeft = useCallback(
    (timeRemaining: number) => {
      // Format time to mm:ss

      if (enrageTimer >= time || variant === TIMER_TYPE.ENRAGE) {
        const minutes = Math.max(Math.floor(timeRemaining / 60), 0);
        const seconds = Math.max(Math.floor(timeRemaining % 60), 0);
        const minutesStr =
          minutes < 10 ? `0${minutes.toString()}` : minutes.toString();
        const secondsStr =
          seconds < 10 ? `0${seconds.toString()}` : seconds.toString();

        return `${minutesStr}:${secondsStr}`;
      }

      return 'Not enough time';
    },
    [enrageTimer, time, variant]
  );

  const formatEnrageTimeLeft = useCallback(() => {
    // Format to mm:ss left on the enrage timer
    if (enrageTimer && variant !== TIMER_TYPE.ENRAGE)
      return formatTimeLeft(enrageTimer - time);
  }, [enrageTimer, formatTimeLeft, time, variant]);

  const onTimerClick = (e: React.MouseEvent) => {
    // If the button next to the timer is clicked
    setShowEnrageTimeLeft(true);
    if (setForceStart) setForceStart(false);

    // Reset the time
    if (fightStarted) setTimeLeft(time);

    // Start the timer if it is stopped and the fight has already begun
    if (!start && fightStarted) setStart(true);
  };

  const formatName = () => {
    // Capitalize each word
    const nameArr = variant.split('-');
    const newNameArr = nameArr.map(
      word => word[0].toUpperCase() + word.substring(1)
    );
    const formattedName = newNameArr.join(' ');

    return formattedName;
  };

  useEffect(() => {
    // When the both button is clicked, forces timer to start
    if (forceStart) {
      setTimeLeft(time);
      setStart(true);
      if (setForceStart) setForceStart(false);
    }
  }, [forceStart, setForceStart, time]);

  useEffect(() => {
    // Effect to count the enrage timer down
    if (variant === TIMER_TYPE.ENRAGE && setEnrageTimer)
      setEnrageTimer(timeLeft);
  }, [setEnrageTimer, timeLeft, variant]);

  useEffect(() => {
    // Start the timer automatically if it is the enrage timer
    setStart(variant === TIMER_TYPE.ENRAGE && fightStarted);
  }, [fightStarted, time, variant]);

  useEffect(() => {
    // If fight was reset then reset the timer and hide enrage timer
    if (!fightStarted) {
      if (setForceStart) setForceStart(false);
      setShowEnrageTimeLeft(false);
      setTimeLeft(time);
    }
  }, [fightStarted, setForceStart, time]);

  useEffect(() => {
    // Main countdown logic
    const timerInterval = setInterval(() => {
      if (start) {
        setTimeLeft(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timerInterval);
            setShowEnrageTimeLeft(false);
            setStart(false);
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
    // Copy to clipboard
    e.preventDefault();
    if (fightStarted) {
      if (variant === TIMER_TYPE.ENRAGE) {
        await navigator.clipboard.writeText(
          `${timeLeftVerbiage()} ${timeLeft} seconds`
        );
      } else if (start) {
        await navigator.clipboard.writeText(
          `${timeLeftVerbiage()} ${timeLeft} seconds ${enrageTimeLeftVerbiage()} ${formatEnrageTimeLeft()}`
        );
      }
    }
  };

  // Disabled logic for the copy functionality
  const disabled = !(fightStarted && (variant === TIMER_TYPE.ENRAGE || start));

  // Show the flashing warning at 3 seconds
  const showWarning = timeLeft < 3;

  const warningVerbiage = () => {
    switch (variant) {
      case TIMER_TYPE.ENRAGE:
        return 'Enraging! Good luck';
      case TIMER_TYPE.METEOR:
        return `Blue meteor ${timeLeft > 0 ? 'is dropping' : 'dropped'}`;
      case TIMER_TYPE.TILE:
        return `Tile ${timeLeft > 0 ? 'is regenerating' : 'regenerated'}`;
      default:
        break;
    }
  };

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

      <div className="button-container">
        {variant !== TIMER_TYPE.ENRAGE && (
          <Button
            className={`${variant}-button`}
            label={formatName()}
            onClick={onTimerClick}
            disabled={!fightStarted || enrageTimer < time}
          />
        )}
        {showWarning && <p className="warning">{warningVerbiage()}</p>}
      </div>
    </div>
  );
};

export default Timer;
