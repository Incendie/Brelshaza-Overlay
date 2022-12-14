import React, { Dispatch, useCallback, useEffect, useState } from 'react';
import { TIMER_TYPE } from '../../constants/timer';
import Button from '../Button';
import image from '../../../assets/copy.png';
import notifAudio from '../../../assets/meteor-notification.m4a';
import successAudio from '../../../assets/tile-notification.m4a';
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
  const [enrageTimeLeft, setEnrageTimeLeft] = useState('');

  const formatTimeLeft = useCallback(
    (timeRemaining: number) => {
      // Format time to mm:ss
      const minutes = Math.max(Math.floor(timeRemaining / 60), 0);
      const seconds = Math.max(Math.floor(timeRemaining % 60), 0);
      const minutesStr =
        minutes < 10 ? `0${minutes.toString()}` : minutes.toString();
      const secondsStr =
        seconds < 10 ? `0${seconds.toString()}` : seconds.toString();

      // Show not enough time if the enrage timer is less than the amount of time needed
      if (enrageTimer < time && !start && variant !== TIMER_TYPE.ENRAGE) {
        return 'Not enough time';
      }

      return `${minutesStr}:${secondsStr}`;
    },
    [enrageTimer, start, time, variant]
  );

  const formatEnrageTimeLeft = useCallback(() => {
    // Format to mm:ss left on the enrage timer
    if (enrageTimer && variant !== TIMER_TYPE.ENRAGE)
      return formatTimeLeft(enrageTimer - time);
    return '';
  }, [enrageTimer, formatTimeLeft, time, variant]);

  const onTimerClick = (e: React.MouseEvent) => {
    // If the button next to the timer is clicked
    setShowEnrageTimeLeft(true);
    setEnrageTimeLeft(formatEnrageTimeLeft());
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
    if (forceStart && enrageTimer > time) {
      setTimeLeft(time);
      setStart(true);
      setShowEnrageTimeLeft(true);
      setEnrageTimeLeft(formatEnrageTimeLeft());
      if (setForceStart) setForceStart(false);
    }
  }, [enrageTimer, forceStart, formatEnrageTimeLeft, setForceStart, time]);

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
            if (variant === TIMER_TYPE.TILE) {
              clearInterval(timerInterval);
              setShowEnrageTimeLeft(false);
              setStart(false);
            }
            if (variant === TIMER_TYPE.METEOR) {
              setEnrageTimeLeft(formatEnrageTimeLeft());
              return time;
            }

            return 0;
          }

          return prevTime - 1;
        });
      }
    }, 1000);

    if (!start) clearInterval(timerInterval);

    return () => clearInterval(timerInterval);
  }, [formatEnrageTimeLeft, start, time, timeLeft, variant]);

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
      switch (variant) {
        case TIMER_TYPE.METEOR:
          await navigator.clipboard.writeText(
            `Next meteor at ${enrageTimeLeft}`
          );
          break;
        case TIMER_TYPE.TILE:
          await navigator.clipboard.writeText(
            `Next Tile regenerates at ${enrageTimeLeft}`
          );
          break;
        default:
          break;
      }
    }
  };

  // Disabled logic for the copy functionality
  const disabled = !(fightStarted && (variant === TIMER_TYPE.ENRAGE || start));

  // Show the flashing warning at 3 seconds
  const showWarning = timeLeft < 5;

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

  useEffect(() => {
    const meteorNotif = new Audio(notifAudio);
    const meteorDropped = new Audio(successAudio);
    meteorNotif.load();
    meteorDropped.load();
    meteorNotif.muted = false;
    meteorDropped.muted = false;

    const audioInterval = setInterval(() => {
      if (variant === TIMER_TYPE.METEOR) {
        if (showWarning && timeLeft > 0) {
          meteorNotif.play();
        } else if (!showWarning || timeLeft <= 0) {
          clearInterval(audioInterval);
          if (timeLeft === 0) meteorDropped.play();
        }
      }
    }, 1000);

    return () => clearInterval(audioInterval);
  }, [showWarning, timeLeft, variant]);

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
            <span>{enrageTimeLeft}</span>
          </p>
        )}
        {variant !== TIMER_TYPE.ENRAGE && (
          <button className="copy" type="button" disabled={disabled}>
            <img src={image} alt="Copy icon" />
          </button>
        )}
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
