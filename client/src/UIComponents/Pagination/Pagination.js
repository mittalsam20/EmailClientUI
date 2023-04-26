import React from "react";

import "./Pagination.css";
import { colors } from "Constants/Constants";

const getPageNumberBoxStyles = ({ isCurrentPage }) => {
  return isCurrentPage
    ? {
        border: `1px solid ${colors.accent}`,
        backgroundColor: colors.background,
      }
    : {};
};

const PageNumber = React.memo((props) => {
  const { number, currentPageNumber, onClickPage } = props;
  const isCurrentPage = number === currentPageNumber;
  const pageNumberBoxStyles = getPageNumberBoxStyles({ isCurrentPage });

  return (
    <div
      style={pageNumberBoxStyles}
      className={"pageNumberBox"}
      onClick={() => onClickPage({ pageNumber: number })}
    >
      {number}
    </div>
  );
});

const Pagination = React.memo((props) => {
  const { numberOfPages, currentPageNumber, onClickPage } = props;
  const pages = [...Array(numberOfPages)];

  return (
    <div className="paginationContainer">
      {pages.map((number, index) => {
        //since pageNumbers wont be altered we can use index as key
        return (
          <PageNumber
            key={index}
            number={index + 1}
            onClickPage={onClickPage}
            currentPageNumber={currentPageNumber}
          />
        );
      })}
    </div>
  );
});

export default Pagination;
