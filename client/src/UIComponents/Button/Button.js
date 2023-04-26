import React from "react";

import "./Button.css";
import { colors } from "Constants/Constants";

const variantToColorsMapping = {
  primary: { bgColor: colors.accent, color: colors.white },
};

const getButtonStyles = ({ variant }) => {
  const { bgColor, color } = variantToColorsMapping[variant];
  return {
    color,
    backgroundColor: bgColor,
  };
};

const Button = (props) => {
  const { children, onClick, variant = "primary" } = props;
  const buttonStyles = getButtonStyles({ variant });

  return (
    <div className="button" style={buttonStyles} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
