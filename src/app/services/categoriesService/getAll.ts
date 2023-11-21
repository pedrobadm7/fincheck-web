import { Category } from '../../entities/categories';
import { httpClient } from '../httpClient';

type CategoriesResponse = Array<Category>

export async function getAll() {
  const { data } = await httpClient.get<CategoriesResponse>('/categories');

  return data;
}

