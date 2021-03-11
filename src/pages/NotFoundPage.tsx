import React from 'react';
import * as L from '@korus/leda';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = (): JSX.Element => (
  <>
    <L.H1>Страница не найдена</L.H1>

    <L.Div className="txt-center">
      <Link to="/notes">Cписок заметок</Link>
    </L.Div>
  </>
);
