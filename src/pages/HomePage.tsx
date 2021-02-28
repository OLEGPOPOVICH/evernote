import React from 'react';
import * as L from '@korus/leda';
import { Link } from 'react-router-dom';

/**
 * ## Компонент главной страницы
 *
 * @returns {JSX.Element} Компонент главной страницы
 */
export const HomePage: React.FC = () => (
  <>
    <L.H1>Главная страница</L.H1>
    <Link to="/notes">Список заметок</Link>
  </>
);
