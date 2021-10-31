/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NoteItemType } from './types';
import { SortNotesType } from './components/FilterNotes';

export const useFilterNotes = (
  notes: NoteItemType[],
  sort: SortNotesType,
  query: string,
) => {
  if (sort && query) {
    return notes.filter((note: NoteItemType) => {
      switch (sort) {
        case 'title':
          return note[sort].toLowerCase().includes(query.toLowerCase());
        case 'tags': {
          const sortValue = note[sort]?.map((value) => value.toLowerCase());
          const queryValue = query.toLowerCase();
          let isFind = false;

          if (!sortValue?.length) {
            return isFind;
          }

          sortValue.forEach((value) => {
            if (!isFind) {
              isFind = value.includes(queryValue);
            }
          });

          return isFind;
        }
        default:
          return true;
      }
    });
  }

  return notes;
};
