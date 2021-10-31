import React, { ReactElement } from 'react';
import * as L from '@korus/leda';

type ButtonRoundType = {
  disabled: boolean;
  title: string;
  classBtn: string;
  classIcon: string;
  onClick: () => void;
};

/**
 * ## Компонент ButtonRound
 *
 * @param {number} disabled состояние кнопки
 * @param {number} title всплывающая подсказка
 * @param {number} classBtn класс для кнопки
 * @param {number} classIcon класс для иконки
 * @param {Function} onClick Обработчик изменения текущей страницы
 *
 * @returns {ReactElement} Компонент ButtonRound
 */
export const ButtonRound = ({
  disabled,
  title,
  classBtn,
  classIcon,
  onClick,
}: ButtonRoundType): ReactElement => {
  let classNameBtn = classBtn;

  if (disabled) {
    classNameBtn += ' disabled';
  }

  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <L.A className={classNameBtn} title={title} onClick={handleClick}>
      <L.Span className={classIcon} />
    </L.A>
  );
};
