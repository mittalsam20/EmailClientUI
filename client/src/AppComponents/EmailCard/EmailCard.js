import React, { useMemo } from "react";

import "./EmailCard.css";
import Avatar from "UIComponents/Avatar";
import { colors } from "Constants/Constants";

import {
  capitalizeFirstLetter,
  getFormattedDateFromTimestamp,
} from "Utils/helperFunctions";

const EmailDetails = (props) => {
  const {
    entityName,
    isEmailFavorite,
    value: {
      value,
      customStyle = {},
      showFavorite = false,
      showEntityName = false,
    },
  } = props;

  return (
    <div className={"detail"}>
      {showEntityName && <div className="entityName">{`${entityName}:`}</div>}
      <div style={customStyle} className="value">
        {value}
      </div>
      {isEmailFavorite && showFavorite && (
        <div className={"favoriteText"}>{"Favorite"}</div>
      )}
    </div>
  );
};

const getCardContainerStyle = ({ id, isEmailRead, selectedEmail }) => {
  let cardContainerStyle = {};
  if (id === selectedEmail?.id)
    cardContainerStyle = {
      ...cardContainerStyle,
      border: `1px solid ${colors.accent}`,
    };
  else if (isEmailRead)
    cardContainerStyle = {
      ...cardContainerStyle,
      backgroundColor: colors.readBackground,
    };
  return cardContainerStyle;
};

const getFormattedEmail = ({
  name,
  subject,
  email,
  date,
  selectedEmail,
  short_description,
}) => {
  const capitalizedName = capitalizeFirstLetter({ string: name });
  const formattedDate = getFormattedDateFromTimestamp({ timestamp: date });
  return {
    from: {
      value: `${capitalizedName} <${email}>`,
      customStyle: { fontWeight: 700 },
      isTextBold: true,
      showEntityName: true,
    },
    subject: {
      value: subject,
      customStyle: { fontWeight: 700 },
      showEntityName: true,
    },
    description: {
      value: short_description,
      customStyle: {
        margin: "8px 0",
        overflow: selectedEmail ? "hidden" : "visible", //not the best way to do it, I know
        textOverflow: selectedEmail ? "ellipsis" : "initial",
      },
    },
    date: { value: formattedDate, showFavorite: true },
  };
};

const EmailCard = React.memo((props) => {
  const {
    id,
    date,
    subject,
    short_description,
    from: { name, email },
    isEmailRead,
    selectedEmail,
    isEmailFavorite,
    onClickEmailCard,
  } = props;

  const cardContainerStyle = useMemo(() => {
    return getCardContainerStyle({
      id,
      isEmailRead,
      selectedEmail,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEmail]);

  const formattedEmail = useMemo(() => {
    return getFormattedEmail({
      name,
      subject,
      email,
      date,
      selectedEmail,
      short_description,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEmail]);

  return (
    <div
      onClick={onClickEmailCard}
      style={cardContainerStyle}
      className={"emailCardContainer"}
    >
      <Avatar name={name} />
      <div className={"emailDetailContainer"}>
        {Object.keys(formattedEmail).map((key) => (
          <EmailDetails
            key={key}
            entityName={key}
            value={formattedEmail[key]}
            isEmailFavorite={isEmailFavorite}
          />
        ))}
      </div>
    </div>
  );
});

export default EmailCard;
