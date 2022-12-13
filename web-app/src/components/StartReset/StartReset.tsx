import Button from '../../_shared/components/Button';
import './styles.scss';

interface IStartReset {
  onClick: (e: React.MouseEvent) => void;
  fightStarted: boolean;
}

// Button the flips between Start and Reset
const StartReset: React.FC<IStartReset> = ({ onClick, fightStarted }) => {
  return (
    <Button
      className={`${fightStarted ? 'reset' : 'start'}-button`}
      disabled={false}
      label={fightStarted ? 'Reset' : 'Start'}
      onClick={onClick}
    />
  );
};

export default StartReset;
