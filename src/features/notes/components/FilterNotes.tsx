/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { MouseEvent } from 'react';
import { DropDownSelect } from '@common/components';
import * as L from '@korus/leda';
import { SelectValueType } from '@common/components/DropDownSelect/DropDownSelect';

export type SortNotesType = 'title' | 'tags' | '';

export type FilterNotesTypes = {
  sort: SortNotesType;
  query: string;
};

export type FilterNotesProps = {
  filter: FilterNotesTypes;
  setFilter: ({ sort, query }: FilterNotesTypes) => void;
};

export const FilterNotes = ({ filter, setFilter }: FilterNotesProps) => {
  const handleChange = (
    event: MouseEvent<HTMLLIElement>,
    option: SelectValueType,
  ) => {
    setFilter({ ...filter, sort: option.value });
  };

  const handleChangeInput = (event: L.InputTypes.ChangeEvent) => {
    setFilter({ ...filter, query: event.component.value });
  };

  return (
    <div className="filter-flex">
      <div className="filter-sort">
        <DropDownSelect
          data={[
            { name: 'По названию', value: 'title' },
            { name: 'По тегам', value: 'tags' },
          ]}
          textField="name"
          value={{ name: filter.sort }}
          onChange={handleChange}
          placeholder="Выбрать"
        />
      </div>
      <div className="margin-left width-100">
        <L.Input
          className="small"
          name="sort"
          value={filter.query}
          placeholder="Поиск"
          onChange={handleChangeInput}
        />
      </div>
    </div>
  );
};
