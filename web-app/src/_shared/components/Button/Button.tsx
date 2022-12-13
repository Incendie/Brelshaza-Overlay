import React from "react";

import "./styles.scss";

interface IButton {
  className: string;
  label: string;
}

const Button: React.FC<IButton> = ({ className, label }) => {
  return (
    <button className={className} type="button">
      {label}
    </button>
  );
};

export default Button;
