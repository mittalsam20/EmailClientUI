import React from "react";
import "./Chip.css";

const Chip = (props) => {
  const { children } = props;
  return <div className="chipContainer">{children}</div>;
};

export default Chip;
