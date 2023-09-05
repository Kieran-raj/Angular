import { Category } from 'src/app/shared/models/category';

export interface CategoryState {
  /**
   * Categories
   */
  categories: Category[] | null;
}
