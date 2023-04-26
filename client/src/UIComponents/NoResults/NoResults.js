import React from "react";
import "./NoResults.css";

const NoResults = (props) => {
  const { text = "No Results Found..." } = props;
  return <div className="noResultsContainer">{text}</div>;
};

export default NoResults;
