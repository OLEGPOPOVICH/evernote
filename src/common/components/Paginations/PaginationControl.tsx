import React from 'react';
import { ButtonRound } from '../ButtonRound';

type PaginationControlTypes = {
  totalPages: number;
  currentPage: number;
  nextPage: number;
  title: string;
  type: string;
  gotoPage: (page: number) => void;
};

export const PaginationControl = ({
  totalPages,
  currentPage,
  nextPage,
  title,
  type,
  gotoPage,
}: PaginationControlTypes): React.ReactElement => {
  const isDisabled = ['next', 'last'].includes(type)
    ? currentPage === totalPages
    : currentPage === 1;

  return (
    <ButtonRound
      disabled={isDisabled}
      title={title}
      classBtn={`pagination-controls pagination-button ${type}`}
      classIcon={`icon-${type}`}
      onClick={() => gotoPage(nextPage)}
    />
  );
};
