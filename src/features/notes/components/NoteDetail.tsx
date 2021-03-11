import React from 'react';
import * as L from '@korus/leda';

import { Tags } from '@common/components';
import { dateFormat } from '@common/utils';
import { Link } from 'react-router-dom';
import { NoteItemType } from '../types';

/**
 * ## Компонент детальной страницы заметки
 *
 * @param {string} id id заметки
 * @param {string} title Заголовок заметки
 * @param {string} desc Текст заметки
 * @param {string} imgUrl Картинка заметки
 * @param {string} date Дата заметки
 * @param {string} views Количество просмотров
 * @param {TagType[]} tags Список тегов заметки
 *
 * @returns {JSX.Element} Компонент детальной страницы заметки
 */
export const NoteDetail: React.FC<NoteItemType> = ({
  title,
  desc,
  imgUrl,
  date,
  views,
  tags,
}: NoteItemType): JSX.Element => (
  <L.Div className="note__detail">
    <L.Div>
      <L.Div className="note__img">
        <L.Img src={imgUrl} />
      </L.Div>
      <L.Div className="note__info">
        <L.Div className="note__caption">
          <L.H2>{title}</L.H2>
          <L.Div className="info">
            <L.Span className="margin-right">
              <L.I className="sbicon-ellips-eye txt-gray margin-right-small" />
              {views}
            </L.Span>
            <L.Span>{dateFormat({ date, format: 'DD.MM.YYYY' })}</L.Span>
          </L.Div>
        </L.Div>
        <L.Div className="note__desc">
          <L.P>{desc}</L.P>
        </L.Div>
      </L.Div>
    </L.Div>
    <L.Div>
      <L.Div className="btn__back">
        <L.Button>
          <Link to="/notes">К списку заметок</Link>
        </L.Button>
      </L.Div>
      <L.Div className="note__tags">
        <Tags tags={tags} />
      </L.Div>
    </L.Div>
  </L.Div>
);
