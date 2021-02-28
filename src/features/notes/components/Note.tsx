import React from 'react';
import * as L from '@korus/leda';

import { dateFormat } from '@common/utils';
import { Tags } from '@common/components';
import { NoteType } from '../types';

/**
 * ## Компонент заметки
 *
 * @param {string} title Заголовок заметки
 * @param {string} desc Текст заметки
 * @param {string} imgUrl Картинка заметки
 * @param {string} date Дата заметки
 * @param {TagType[]} tags Список тегов заметки
 *
 * @returns {JSX.Element} Компонент заметки
 */
export const Note: React.FC<NoteType> = ({
  title,
  desc,
  imgUrl,
  date,
  tags,
}: NoteType): JSX.Element => (
  <L.Li className="note">
    <L.Div className="note__img">
      <L.Img src={imgUrl} />
    </L.Div>
    <L.Div className="note__info">
      <L.Div className="note__caption">
        <L.H2>{title}</L.H2>
        <L.Span>{dateFormat({ date, format: 'DD.MM.YYYY' })}</L.Span>
      </L.Div>
      <L.Div className="note__desc">
        <L.P>{desc}</L.P>
      </L.Div>
      <L.Div className="note__tags">
        <Tags tags={tags} />
      </L.Div>
    </L.Div>
  </L.Li>
);
