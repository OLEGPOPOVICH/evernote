import React, { useState } from 'react';
import * as L from '@korus/leda';
import { Link } from 'react-router-dom';

export type TagType = {
  name: string;
  href: string;
};

export type TagsType = {
  tags: Array<TagType>;
};

/**
 * ## Компонент список тегов
 *
 * @param {TagsType} tags Список тегов
 *
 * @returns {JSX.Element} Компонент список тегов
 */
export const Tags: React.FC<TagsType> = ({ tags }: TagsType): JSX.Element => {
  const [allTags, setAllTags] = useState(false);
  /**
   * ## Метод редеринга списка тегов
   *
   * @returns {JSX.Element} Список тегов
   */
  function renderTags() {
    return tags.map(
      (tag: TagType, index: number) =>
        (allTags || index + 1 <= 3) && (
          <L.Li key={tag.name}>
            <Link to={tag.href}>{tag.name}</Link>
          </L.Li>
        ),
    );
  }

  return (
    <L.Ul className="tags padding-none">
      {tags && renderTags()}
      {tags.length && !allTags ? (
        <L.Li className="btn__all" onClick={() => setAllTags(true)}>
          Все
        </L.Li>
      ) : null}
    </L.Ul>
  );
};
