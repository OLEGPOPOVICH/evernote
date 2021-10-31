import React, { FC, memo, ReactNode } from 'react';

import * as L from '@korus/leda';

type ComponentWrapperType = {
  data: number;
  info: string;
  children: ReactNode;
};

const ComponentWrapperInner: FC<ComponentWrapperType> = ({
  data,
  info,
  children,
}): JSX.Element => (
  <>{data ? children : <L.Div className="padding txt-center">{info}</L.Div>}</>
);

export const ComponentWrapper = memo(ComponentWrapperInner);
