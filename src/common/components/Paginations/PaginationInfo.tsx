import React from 'react';
import * as L from '@korus/leda';

export type PaginationInfoType = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageLimit: number;
};

export const PaginationInfo = ({
  totalCount,
  totalPages,
  currentPage,
  pageLimit,
}: PaginationInfoType): React.ReactElement => {
  const right = Math.min(totalCount, currentPage * pageLimit);
  const left =
    totalPages !== currentPage
      ? Math.max(1, right - pageLimit + 1)
      : currentPage * pageLimit - pageLimit + 1;

  return (
    <L.Span className="pagination-label-info">
      {`${left} - ${right} из ${totalCount}`}
    </L.Span>
  );
};
