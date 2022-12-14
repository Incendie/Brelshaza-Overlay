import StartReset from '../StartReset';
import mokoHi from '../../assets/mokoHiBrel.png';
import './styles.scss';

interface IHeader {
  fightStarted: boolean;
  onStartReset: (e: React.MouseEvent) => void;
}

const Header: React.FC<IHeader> = ({ fightStarted, onStartReset }) => {
  return (
    <header>
      <h1>
        <span>Brelshaza Timer</span>
        <img src={mokoHi} alt="Brelshaza Mokoko" />
      </h1>
      <StartReset onClick={onStartReset} fightStarted={fightStarted} />
    </header>
  );
};

export default Header;
