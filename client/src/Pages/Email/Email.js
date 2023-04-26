import React from "react";
import { connect } from "react-redux";
import { updateEmailFilters } from "Store";

import "./Email.css";

const Email = (props) => {
  const { emailFilters, selectedEmail, updateEmailFilters } = props;

  return <div className={"emailPageContainer"}></div>;
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
