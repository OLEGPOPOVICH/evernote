/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { MouseEvent, ReactElement, useMemo, useState } from 'react';
import * as L from '@korus/leda';
import './styles.css';

export type SelectValueType = {
  [x: string]: any;
};

type DropDownSelectType = {
  data: SelectValueType[];
  textField: string;
  value: SelectValueType;
  onChange: (e: MouseEvent<HTMLLIElement>, option: any) => void;
  placeholder?: string;
};

type SelectedValueTypes = {
  data: SelectValueType;
  textField: string;
  value: SelectValueType;
};

const getSelectedDropDown = ({
  data,
  textField,
  value,
}: SelectedValueTypes) => {
  const selectedIndex = data.findIndex(
    (option: SelectValueType) => option[textField] === value[textField],
  );

  if (selectedIndex === -1) {
    return [{}, null];
  }

  return [data[selectedIndex], selectedIndex];
};

export const DropDownSelect = ({
  data,
  textField,
  value,
  onChange,
  placeholder,
}: DropDownSelectType): ReactElement => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [selectedItem, indexItem] = getSelectedDropDown({
    data,
    textField,
    value,
  });
  const [selectedValue, setSelectedValue] = useState<SelectValueType>(
    selectedItem,
  );
  const [selectedIndex, setSelected] = useState<number | null>(indexItem);

  const onClickHandler = (
    e: MouseEvent<HTMLLIElement>,
    optionIndex: number,
  ) => {
    setToggle(toggle);
    setSelected(optionIndex);
    setSelectedValue(data[optionIndex]);
    onChange(e, data[optionIndex]);
  };

  const onToggleHandler = () => {
    setToggle(!toggle);
  };

  const renderOptions = useMemo(
    () =>
      data.map((option, index) => (
        <L.Li
          className={`suggestion-item ${
            selectedIndex === index ? 'highlighted selected' : ''
          }`}
          key={option[textField]}
          onClick={(e) => onClickHandler(e, index)}
        >
          {option[textField]}
        </L.Li>
      )),
    [selectedIndex],
  );

  return (
    <L.Div className="dropdownselect-wrapper">
      <L.Div
        className="dropdownselect-input-wrapper"
        onClick={() => onToggleHandler()}
      >
        <L.Div className="dropdownselect-input">
          {selectedValue[textField] || placeholder}
        </L.Div>
        <L.Span
          className={`dropdownselect-select-icon ${
            toggle ? 'opened' : 'closed'
          }`}
        />
      </L.Div>
      {toggle && (
        <L.Div className="suggestion-wrapper visible">
          <L.Ul className="suggestion-list">{renderOptions}</L.Ul>
        </L.Div>
      )}
    </L.Div>
  );
};
