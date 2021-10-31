import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as L from '@korus/leda';
import { dateFormat, trimString } from '@common/utils';

import { Tags } from '@common/components';
import { NoteType } from '../types';
import { selectors } from '../selectors';
import { actions } from '../ducks';
import { queryParams } from '../constants';

/**
 * ## Компонент заметки
 * @param {string} id id заметки
 * @param {string} title Заголовок заметки
 * @param {string} desc Текст заметки
 * @param {string} imgUrl Картинка заметки
 * @param {string} date Дата заметки
 * @param {string} views Количество просмотров
 * @param {string[]} tags Список тегов заметки
 *
 * @returns {JSX.Element} Компонент заметки
 */
export const Note: React.FC<NoteType> = ({
  note,
  queryStr,
}: NoteType): JSX.Element => {
  const { id, title, desc, imgUrl, date, views, tags } = note;

  const dispatch = useDispatch();
  const query = queryParams.tagsLike;
  const { activeTag } = useSelector(selectors.getActiveTag);

  const onClickHandler = useCallback(
    (tag) => {
      dispatch(actions.setActiveTag({ activeTag: tag }));
      dispatch(actions.setCurrentPage({ currentPage: 1 }));
      dispatch(actions.loadingNotesPage());
    },
    [dispatch],
  );

  return (
    <L.Li className="note">
      <L.Div className="note__img">
        <L.Img src={imgUrl} />
      </L.Div>
      <L.Div className="note__info">
        <L.Div className="note__caption">
          <L.H2>
            <Link to={`/notes/detail/${id}${queryStr}`}>{title}</Link>
          </L.H2>
          <L.Div className="info">
            <L.Span className="margin-right">
              <L.I className="sbicon-ellips-eye txt-gray margin-right-small" />
              {views}
            </L.Span>
            <L.Span>{dateFormat({ date, format: 'DD.MM.YYYY' })}</L.Span>
          </L.Div>
        </L.Div>
        <L.Div className="note__desc">
          <L.P>{trimString(desc, 300)}</L.P>
        </L.Div>
        <L.Div className="note__tags">
          <Tags
            tags={tags}
            params={{
              show: 3,
              activeTag,
              query,
            }}
            onClick={onClickHandler}
          />
        </L.Div>
      </L.Div>
    </L.Li>
  );
};
