import React from "react";
import { connect } from "react-redux";
import { updateEmailFilters } from "Store";

import "./Email.css";
import EmailList from "Pages/EmailList";
import EmailBody from "AppComponents/EmailBody";
import FilterHeader from "AppComponents/FilterHeader";

const filtersToShow = [
  {
    id: "status",
    label: "Status",
    type: "chip",
    options: [
      {
        id: "UNREAD",
        value: "UNREAD",
        optionLabel: "Unread",
      },
      {
        id: "READ",
        value: "READ",
        optionLabel: "Read",
      },
      {
        id: "FAVORITES",
        value: "FAVORITES",
        optionLabel: "Favorites",
      },
    ],
  },
];

const Email = (props) => {
  const { emailFilters, selectedEmail, updateEmailFilters } = props;

  return (
    <div className={"emailPageContainer"}>
      <FilterHeader
        onchange={updateEmailFilters}
        filtersToShow={filtersToShow}
        selectedFilters={emailFilters}
      />
      <div className={"listAndBodyContainer"}>
        <EmailList />
        {selectedEmail && <EmailBody selectedEmail={selectedEmail} />}
      </div>
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
    updateEmailFilters: (params) => dispatch(updateEmailFilters(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Email);
