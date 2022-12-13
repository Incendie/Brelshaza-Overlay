import React from 'react';

import './styles.scss';

interface IButton {
  className: string;
  label: string;
  onClick: (e: React.MouseEvent) => void;
}

const Button: React.FC<IButton> = ({ className, label, onClick }) => {
  return (
    <button className={className} type="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
