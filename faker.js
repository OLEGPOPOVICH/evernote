import faker from 'faker';
import fs from 'fs';
import { logger } from '@common/utils';

const { productName, productDescription } = faker.commerce;

const products = [...Array(30).keys()].map((_, index) => ({
  id: index + 1,
  title: productName(),
  description: productDescription(),
  imageUrl: 'https://picsum.photos/300/300',
}));

const users = [
  { login: 'Oleg', password: '123456' },
  { login: 'Vlad', password: '1234' },
];

const json = { products, users };

fs.writeFileSync('./db.json', JSON.stringify(json), 'utf-8', () => {
  logger('Файл был успешно создан');
});
