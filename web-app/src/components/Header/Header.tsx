import StartReset from '../StartReset';
import './styles.scss';

interface IHeader {
  fightStarted: boolean;
  onStartReset: (e: React.MouseEvent) => void;
}

const Header: React.FC<IHeader> = ({ fightStarted, onStartReset }) => {
  return (
    <header>
      <h1>Brelshaza Timer</h1>
      <StartReset onClick={onStartReset} fightStarted={fightStarted} />
    </header>
  );
};

export default Header;
