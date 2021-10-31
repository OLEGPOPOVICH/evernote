import React, { MouseEvent } from 'react';
import * as L from '@korus/leda';
import {
  DropDownSelect,
  SelectValueType,
} from '../DropDownSelect/DropDownSelect';

type SelectionNumberElementsType = {
  pageLimitOptions: SelectValueType[];
  pageLimit: number;
  onChangeSelect: (
    e: MouseEvent<HTMLLIElement>,
    option: SelectValueType,
  ) => void;
};

export const SelectionNumberElements = ({
  pageLimitOptions,
  pageLimit,
  onChangeSelect,
}: SelectionNumberElementsType): React.ReactElement => {
  const currentLimitOption = pageLimitOptions.filter(
    (option) => option.value === pageLimit,
  );

  return (
    <L.Div className="pagination-label-options">
      {pageLimitOptions && pageLimitOptions.length ? (
        <>
          <DropDownSelect
            data={pageLimitOptions}
            textField="name"
            value={currentLimitOption[0]}
            onChange={(e, option) => onChangeSelect(e, option)}
          />
          Показать на странице
        </>
      ) : null}
    </L.Div>
  );
};
