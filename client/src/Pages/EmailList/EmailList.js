import React, { useEffect, useMemo } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { addEmailToRead, resetSelectedEmail, updateSelectedEmail } from "Store";

import "./EmailList.css";
import withAxios from "HOCs/withAxios";
import withLoader from "HOCs/withLoader";
import NoResults from "UIComponents/NoResults";
import EmailCard from "AppComponents/EmailCard";
import Pagination from "UIComponents/Pagination";

import { FETCH_EMAIL_BASE_URL } from "Constants/Constants";
import { updateEmailFilters } from "Store";

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

const updateSelectedEmailOnFilterChange = ({
  filteredEmails,
  selectedEmail,
  updateSelectedEmail,
}) => {
  if (selectedEmail) {
    const doesFilteredEmailsHaveSelectedEmail = filteredEmails.some(
      ({ id }) => id === selectedEmail.id
    );
    if (!doesFilteredEmailsHaveSelectedEmail) {
      updateSelectedEmail({ email: filteredEmails[0] });
    }
  }
};

//Didn't made this component dumb as this can be reused when scaling app.
const EmailList = (props) => {
  const {
    data: { list: emails = [], total: totalEmails }, // received from withAxios
    emailFilters,
    selectedEmail,
    readEmailIds,
    addEmailToRead,
    favoriteEmailIds,
    resetSelectedEmail,
    updateEmailFilters,
    updateSelectedEmail,
    handleEmailListScroll,
  } = props;
  const { status, page: currentPage } = emailFilters;
  const filteredEmails = useMemo(() => {
    return getFilteredEmails({
      emails,
      emailFilters,
      readEmailIds,
      favoriteEmailIds,
    });
  }, [emails, emailFilters, favoriteEmailIds]);

  //To handle two empty States
  //1 if no emails are there in DB  2 if no filteredEmails are there
  const numberOfResultsPerPage = 10;
  const numberOfPages = Math.ceil(totalEmails / numberOfResultsPerPage);
  const showPaginationSection = numberOfPages > 1 && !status; // pagination will only show when status filter is clear and #of pages>1
  // I am doing this because I cannot determine the behavior of filters with the API provided, will discuss this
  const noResultsText = emails.length
    ? "No Emails found for the selected filters"
    : null;

  const onClickEmailCard = ({ email }) => {
    if (!readEmailIds.includes(email.id)) addEmailToRead({ emailId: email.id });
    if (selectedEmail && email.id === selectedEmail.id) {
      resetSelectedEmail();
      return;
    }
    updateSelectedEmail({ email });
  };

  const onClickPageNumber = ({ pageNumber }) => {
    updateEmailFilters({ name: "page", value: pageNumber });
  };

  useEffect(() => {
    updateSelectedEmailOnFilterChange({
      selectedEmail,
      filteredEmails,
      updateSelectedEmail,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredEmails]);

  return (
    <div className="emailListContainer" onScroll={handleEmailListScroll}>
      {filteredEmails.length ? (
        <>
          {filteredEmails.map(({ id, ...restProps }) => {
            const isEmailRead = readEmailIds.includes(id);
            const isEmailFavorite = favoriteEmailIds.includes(id);
            return (
              <EmailCard
                key={id}
                id={id}
                {...restProps}
                isEmailRead={isEmailRead}
                selectedEmail={selectedEmail}
                isEmailFavorite={isEmailFavorite}
                onClickEmailCard={() =>
                  onClickEmailCard({ email: { id, ...restProps } })
                }
              />
            );
          })}
          {showPaginationSection && (
            <Pagination
              numberOfPages={numberOfPages}
              onClickPage={onClickPageNumber}
              currentPageNumber={currentPage}
            />
          )}
        </>
      ) : (
        <NoResults text={noResultsText} />
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { selectedEmail, emailFilters, readEmailIds, favoriteEmailIds } =
    state.email;
  return {
    readEmailIds,
    emailFilters,
    selectedEmail,
    favoriteEmailIds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetSelectedEmail: () => dispatch(resetSelectedEmail()),
    addEmailToRead: (params) => dispatch(addEmailToRead(params)),
    updateEmailFilters: (params) => dispatch(updateEmailFilters(params)),
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
