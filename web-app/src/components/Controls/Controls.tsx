import Button from "../../_shared/components/Button";

import "./styles.scss";

const Controls = () => {
  return (
    <div className="container">
      <Button className="blue-meteor-button" label="Blue Meteor" />
      <Button className="broken-tile-button" label="Broken Tile" />
      <Button className="both-button" label="Both" />
    </div>
  );
};

export default Controls;
