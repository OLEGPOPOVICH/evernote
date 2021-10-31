import React, { ReactElement } from 'react';
import * as L from '@korus/leda';

type PaginationButtonPageTypes = {
  numberPages: number[];
  currentPage: number;
  gotoPage: (page: number) => void;
};

export const PaginationButtonPage = ({
  numberPages,
  currentPage,
  gotoPage,
}: PaginationButtonPageTypes): ReactElement => {
  if (!numberPages.length) {
    return null;
  }

  return (
    <L.Ul className="pagination-numbers">
      {numberPages.map((page: number) =>
        currentPage === page ? (
          <L.Li key={page} className="current">
            <L.Span className="pagination-button selected">{page}</L.Span>
          </L.Li>
        ) : (
          <L.Li key={page} onClick={() => gotoPage(page)}>
            <L.A className="pagination-button">{page}</L.A>
          </L.Li>
        ),
      )}
    </L.Ul>
  );
};
