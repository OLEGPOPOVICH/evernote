import React from 'react';
import * as L from '@korus/leda';

import { Note } from './Note';
import { NotesType, NoteType } from '../types';

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
    return notes.map((note: NoteType) => <Note {...note} key={note.title} />);
  }

  return <L.Ul className="notes">{notes.length && renderNote()}</L.Ul>;
};
