import Button from '../../_shared/components/Button';

import './styles.scss';

interface IControls {
  onMeteor: (e: React.MouseEvent) => void;
  onTile: (e: React.MouseEvent) => void;
  onBoth: (e: React.MouseEvent) => void;
}

const Controls: React.FC<IControls> = ({ onMeteor, onTile, onBoth }) => {
  return (
    <div className="container">
      <Button
        className="blue-meteor-button"
        label="Blue Meteor"
        onClick={onMeteor}
      />
      <Button
        className="broken-tile-button"
        label="Broken Tile"
        onClick={onTile}
      />
      <Button className="both-button" label="Both" onClick={onBoth} />
    </div>
  );
};

export default Controls;
