import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { updateFavoriteEmailIds } from "Store";

import "./EmailBody.css";
import Avatar from "UIComponents/Avatar";
import Button from "UIComponents/Button";
import withAxios from "HOCs/withAxios/withAxios";
import withLoader from "HOCs/withLoader/withLoader";

import { FETCH_EMAIL_BASE_URL } from "Constants/Constants";
import { getFormattedDateFromTimestamp } from "Utils/helperFunctions";

const EmailBody = (props) => {
  const { data, selectedEmail, favoriteEmailIds, updateFavoriteEmailIds } =
    props;
  const { body } = data;
  const {
    id,
    date,
    subject,
    from: { name },
  } = selectedEmail;
  const formattedDate = getFormattedDateFromTimestamp({ timestamp: date });
  const isEmailFavorite = favoriteEmailIds.includes(id);
  const buttonText = isEmailFavorite
    ? "Remove from favorites"
    : "Mark as favorite";

  const onClickFavorite = () => {
    if (isEmailFavorite) {
      updateFavoriteEmailIds({ action: "REMOVE", emailId: id });
      return;
    }
    updateFavoriteEmailIds({ emailId: id });
  };

  return (
    <div className={"parentContainer"}>
      <Avatar name={name} />
      <div className={"rightContainer"}>
        <div className={"emailBodyHeader"}>
          <div className={"subject"}>{subject}</div>
          <Button onClick={onClickFavorite}>{buttonText}</Button>
        </div>
        <div>{formattedDate}</div>
        <div
          className={"emailBodyContainer"}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const { selectedEmail, emailFilters, favoriteEmailIds } = state.email;
  return {
    emailFilters,
    selectedEmail,
    favoriteEmailIds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFavoriteEmailIds: (params) =>
      dispatch(updateFavoriteEmailIds(params)),
  };
};

const getUrl = (props) => {
  const {
    selectedEmail: { id },
  } = props;
  return `${FETCH_EMAIL_BASE_URL}/?id=${id}`;
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAxios({ getUrl }),
  withLoader
)(EmailBody);
