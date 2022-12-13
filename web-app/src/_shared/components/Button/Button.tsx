import React from 'react';

import './styles.scss';

interface IButton {
  className: string;
  disabled: boolean;
  label: string;
  onClick: (e: React.MouseEvent) => void;
}

const Button: React.FC<IButton> = ({ className, disabled, label, onClick }) => {
  return (
    <button
      className={className}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
