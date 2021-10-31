/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import {
  Pagination as PaginationComponent,
  PaginationTypes,
} from './Pagination';

const meta: Meta = {
  title: 'Components',
  component: PaginationComponent,
  decorators: [withKnobs],
  argTypes: {
    pageLimit: {
      type: 'select',
      options: [5, 10, 20, 50],
    },
    totalCount: { control: { type: 'number', min: 1, max: 100 } },
    currentPage: { control: { type: 'number' } },
    pageNeighbours: {
      type: 'select',
      options: [0, 1, 2, 3, 4, 5],
    },
  },
};

export default meta;

const Template: Story<PaginationTypes> = (args) => (
  <PaginationComponent
    {...args}
    onCurrentPageChange={action('CurrentPage')}
    onPageLimitChange={action('PageLimit')}
  />
);

export const Pagination = Template.bind({});

Pagination.args = {
  pageLimit: 10,
  totalCount: 100,
  currentPage: 1,
  pageNeighbours: 2,
  pageLimitOptions: [
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '20', value: 20 },
    { name: '50', value: 50 },
  ],
};
