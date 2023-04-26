import React from "react";

import "./Avatar.css";
import { getInitialsFromFirstName } from "Utils/helperFunctions";

const Avatar = (props) => {
  const { name } = props;
  const initials = getInitialsFromFirstName({ name });
  return (
    <div>
      <span className="avatarDiv">{initials}</span>
    </div>
  );
};

export default Avatar;
