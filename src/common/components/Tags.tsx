import React, { ReactElement, useCallback, useState } from 'react';
import * as L from '@korus/leda';
import { history } from '@store';

export type ParamsType = {
  show: number;
  activeTag: string;
  query: string;
};

export type TagsType = {
  tags: string[];
  params: ParamsType;
  onClick?: (tag: string) => void;
};

/**
 * ## Компонент список тегов
 *
 * @param {string[]} tags Список тегов
 *
 * @returns {JSX.Element} Компонент список тегов
 */
export const Tags: React.FC<TagsType> = ({
  tags,
  params,
  onClick,
}: TagsType): JSX.Element => {
  const [allTags, setAllTags] = useState(false);
  const { show, activeTag, query } = params;

  const onClickHandler = useCallback(
    (tag: string) => {
      const tagState = activeTag === tag ? '' : tag;

      if (tagState) {
        history.push({
          search: `${query}=${tagState}`,
        });
      } else {
        history.push({
          search: '',
        });
      }

      onClick(tagState);
    },
    [activeTag],
  );

  /**
   * ## Метод редеринга списка тегов
   *
   * @returns {JSX.Element} Список тегов
   */
  function renderTags() {
    return tags.map(
      (tag: string, index: number): ReactElement =>
        (allTags || index + 1 <= show) && (
          <L.Li key={tag} className={params.activeTag === tag && 'active'}>
            {onClick ? (
              <L.Span className="tag-link" onClick={() => onClickHandler(tag)}>
                {tag}
              </L.Span>
            ) : (
              <L.Span>{tag}</L.Span>
            )}
          </L.Li>
        ),
    );
  }

  return (
    <L.Ul className="tags padding-none">
      {tags && renderTags()}
      {tags && tags.length > params.show && !allTags ? (
        <L.Li className="btn__all" onClick={() => setAllTags(true)}>
          Все
        </L.Li>
      ) : null}
    </L.Ul>
  );
};
