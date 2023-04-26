import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { updateSelectedEmail } from "Store";

import "./EmailList.css";
import withAxios from "HOCs/withAxios";
import withLoader from "HOCs/withLoader";
import NoResults from "UIComponents/NoResults";
import EmailCard from "AppComponents/EmailCard";

import { FETCH_EMAIL_BASE_URL } from "Constants/Constants";

const getFilteredEmails = ({
  emails,
  emailFilters,
  readEmailIds,
  favoriteEmailIds,
}) => {
  const { status } = emailFilters;
  if (status === "READ")
    return emails.filter(({ id }) => readEmailIds.includes(id));
  else if (status === "UNREAD")
    return emails.filter(({ id }) => !readEmailIds.includes(id));
  else if (status === "FAVORITES")
    return emails.filter(({ id }) => favoriteEmailIds.includes(id));
  return emails;
};

//Didn't made this component dumb as this can be reused when scaling app.
const EmailList = (props) => {
  const {
    data: { list: emails = [] }, // received from withAxios
    emailFilters,
    readEmailIds,
    favoriteEmailIds,
  } = props;

  const filteredEmails = getFilteredEmails({
    emails,
    emailFilters,
    readEmailIds,
    favoriteEmailIds,
  });

  //To handle two empty States
  //1 if no emails are there in DB  2 if no filteredEmails are there
  const noResultsText = emails.length
    ? "No Emails found for the selected filters"
    : null;

  const onClickEmailCard = ({}) => {};

  return (
    <div className="emailListContainer">
      {filteredEmails.length ? (
        filteredEmails.map(({ id, ...restProps }) => {
          return <EmailCard />;
        })
      ) : (
        <NoResults text={noResultsText} />
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { selectedEmail, emailFilters } = state.email;
  return {
    emailFilters,
    selectedEmail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSelectedEmail: (params) => dispatch(updateSelectedEmail(params)),
  };
};

const getUrl = (props) => {
  const {
    emailFilters: { page },
  } = props;
  return `${FETCH_EMAIL_BASE_URL}/?page=${page}`;
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAxios({ getUrl }),
  withLoader
)(EmailList);
