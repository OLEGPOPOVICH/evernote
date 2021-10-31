/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import * as L from '@korus/leda';

export type DateRangeNotes = [string | null, string | null];

export type RequestFilterNotesTypes = {
  onDateChange: (date: DateRangeNotes) => void;
  onFilterNotes: () => void;
};

export const RequestFilterNotes = ({
  onDateChange,
  onFilterNotes,
}: RequestFilterNotesTypes) => {
  const handleDateChange = (
    event: L.DateTimeInputRangeTypes.CustomRangeEvent,
  ) => {
    onDateChange(event.component.value);
  };

  return (
    <>
      <L.DateRange onChange={handleDateChange} />
      <L.Button className="margin-top" onClick={onFilterNotes}>
        Фильтровать
      </L.Button>
    </>
  );
};
