import React, { MouseEvent, ReactElement, useEffect, useState } from 'react';
import * as L from '@korus/leda';
import { PaginationInfo } from './PaginationInfo';
import { SelectionNumberElements } from './SelectionNumberElements';
import { PaginationControl } from './PaginationControl';
import { PaginationButtonPage } from './PaginationButtonPage';
import { SelectValueType } from '../DropDownSelect/DropDownSelect';
import './styles.css';

type PageNeighboursType = 0 | 1 | 2 | 3 | 4;
export type PaginationTypes = {
  pageLimit: number;
  totalCount: number;
  currentPage: number;
  pageNeighbours: PageNeighboursType;
  pageLimitOptions?: SelectValueType[];
  children?: never;
  onCurrentPageChange: (page: number) => void;
  onPageLimitChange: (e: unknown, option: number) => void;
};

/**
 * ## Компонент Pagination
 *
 * @param {number} pageLimit Количество элементов на странице
 * @param {number} totalCount Общее количество элементов
 * @param {number} currentPage Номер текущей страницы
 * @param {number} pageNeighbours Количества номеров дополнительных страниц
 * @param {SelectType?} pageLimitOptions Выбор вариантов количества элементов на странице, если передан, то появляется выпадающий список
 * @param {Function} onCurrentPageChange Обработчик изменения текущей страницы
 * @param {Function} onPageLimitChange Обработчик изменения количества отображаемых элементов
 *
 * @returns {ReactElement} Компонент Pagination
 */
export const Pagination = ({
  pageLimit,
  totalCount,
  currentPage,
  pageNeighbours,
  pageLimitOptions,
  onCurrentPageChange,
  onPageLimitChange,
}: PaginationTypes): ReactElement => {
  const [numberPages, setNumberPage] = useState<number[]>([]);
  const [totalPages, setTotalPage] = useState<number>(0);
  const [pageLimites, setPageLimit] = useState<number>(pageLimit);

  const range = (from: number, to: number, step = 1) => {
    let i = from;
    const rangeList = [];

    while (i <= to) {
      rangeList.push(i);
      i += step;
    }

    return rangeList;
  };

  useEffect(() => {
    let pages: number[] = [];

    setTotalPage(Math.ceil(totalCount / pageLimites));

    const left = currentPage <= pageNeighbours + 1;
    const right = currentPage >= totalPages - pageNeighbours;
    const center = !left && !right;

    if (left) {
      pages = range(1, Math.min(totalPages, pageNeighbours * 2 + 1));
    } else if (center) {
      pages = range(
        currentPage - pageNeighbours,
        Math.min(totalPages, currentPage + pageNeighbours),
      );
    } else if (right) {
      pages = range(Math.max(1, totalPages - pageNeighbours * 2), totalPages);
    }

    setNumberPage(pages);
  }, [totalCount, currentPage, totalPages, pageLimites]);

  const handleChangeSelect = (
    e: MouseEvent<HTMLLIElement>,
    option: SelectValueType,
  ): void => {
    onPageLimitChange(e, option.value);
    setPageLimit(option.value);
  };

  const handlerGotoPage = (page: number) => {
    onCurrentPageChange(page);
  };

  return (
    <>
      {totalPages > 0 && (
        <L.Div className="pagination-wrapper">
          <PaginationControl
            totalPages={totalPages}
            currentPage={currentPage}
            nextPage={1}
            type="first"
            title="Первая"
            gotoPage={handlerGotoPage}
          />
          <PaginationControl
            totalPages={totalPages}
            currentPage={currentPage}
            nextPage={currentPage - 1}
            type="prev"
            title="Предыдущая"
            gotoPage={handlerGotoPage}
          />

          <PaginationButtonPage
            numberPages={numberPages}
            currentPage={currentPage}
            gotoPage={handlerGotoPage}
          />

          <PaginationControl
            totalPages={totalPages}
            currentPage={currentPage}
            nextPage={currentPage + 1}
            type="next"
            title="Следующая"
            gotoPage={handlerGotoPage}
          />
          <PaginationControl
            totalPages={totalPages}
            currentPage={currentPage}
            nextPage={totalPages}
            type="last"
            title="Последняя"
            gotoPage={handlerGotoPage}
          />

          <SelectionNumberElements
            pageLimit={pageLimit}
            pageLimitOptions={pageLimitOptions}
            onChangeSelect={handleChangeSelect}
          />

          <PaginationInfo
            currentPage={currentPage}
            totalPages={totalPages}
            pageLimit={pageLimit}
            totalCount={totalCount}
          />
        </L.Div>
      )}
    </>
  );
};
