import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { CategoryService } from '../../../expenses/api-services/category.service';
import {
  loadCategories,
  loadCategoriesSuccess
} from '../actions/category.action';

@Injectable()
export class CategoryEffect {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategories),
      mergeMap(() =>
        this.categoryService.getCategories().pipe(
          map((categoryData: any) =>
            loadCategoriesSuccess({
              categories: categoryData
            })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}
}
