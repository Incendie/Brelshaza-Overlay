import StartReset from '../StartReset';
import './styles.scss';

interface IHeader {
  fightStarted: boolean;
  // onBoth: (e: React.MouseEvent) => void;
  // onMeteor: (e: React.MouseEvent) => void;
  onStartReset: (e: React.MouseEvent) => void;
  // onTile: (e: React.MouseEvent) => void;
}

const Header: React.FC<IHeader> = ({
  fightStarted,
  // onBoth,
  // onMeteor,
  onStartReset,
  // onTile,
}) => {
  return (
    <header>
      <h1>Brelshaza Timer</h1>
      <StartReset onClick={onStartReset} fightStarted={fightStarted} />
    </header>
  );
};

export default Header;
