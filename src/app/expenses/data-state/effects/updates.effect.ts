import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { UpdatesService } from '../../api-services/updates.service';
import {
  addNewCategory,
  addNewCategorySuccess,
} from '../actions/updates.action';

@Injectable()
export class UpdatesEffect {
  private updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewCategory),
      mergeMap((action) => {
        const body = [
          {
            category: action.category,
          },
        ];

        return this.updateService
          .updateCategory(body)
          .pipe(map(() => addNewCategorySuccess({ isUpdated: true })));
      })
    )
  );
  constructor(
    private actions$: Actions,
    private updateService: UpdatesService
  ) {}
}