import React from 'react';
import * as L from '@korus/leda';

import { Note } from './Note';
import { NoteItemType, NotesType } from '../types';

/**
 * ## Компонент список заметок
 *
 * @param {NotesType} notes Список заметок
 *
 * @returns {JSX.Element} Компонент список заметок
 */
export const Notes: React.FC<NotesType> = ({
  notes,
}: NotesType): JSX.Element => {
  /**
   * ## Метод редеринга списка заметок
   *
   * @returns {JSX.Element} Список заметок
   */
  function renderNote() {
    return notes.map((note: NoteItemType) => <Note {...note} key={note.id} />);
  }

  return <L.Ul className="notes">{notes ? renderNote() : null}</L.Ul>;
};
