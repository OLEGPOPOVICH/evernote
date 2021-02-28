import React from 'react';
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
  /**
   * ## Метод редеринга списка тегов
   *
   * @returns {JSX.Element} Список тегов
   */
  function renderTags() {
    return tags.map((tag: TagType) => (
      <L.Li key={tag.name}>
        <Link to={tag.href}>{tag.name}</Link>
      </L.Li>
    ));
  }

  return <L.Ul className="tags padding-none">{tags && renderTags()}</L.Ul>;
};
