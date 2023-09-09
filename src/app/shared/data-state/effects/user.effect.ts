import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  deleteUserAccount,
  deleteUserAccountFailure,
  deleteUserAccountSuccess,
  updateUserDetails,
  updateUserDetailsFailure,
  updateUserDetailsSuccess
} from '../actions/user.action';
import { UserSerivce } from 'src/app/shared/api-services/user/user.service';
import { User } from 'src/app/shared/models/user';

@Injectable()
export class UserEffect {
  updateUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserDetails),
      mergeMap((action) => {
        return this.userService.updateUserDetails(action.user).pipe(
          map((response: User) => updateUserDetailsSuccess({ user: response })),
          catchError((error: HttpErrorResponse) => {
            return of(updateUserDetailsFailure({ error: error }));
          })
        );
      })
    )
  );

  deleteUserAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserAccount),
      mergeMap((action) => {
        return this.userService.deleteUser(action.user).pipe(
          map((response: any) => {
            return deleteUserAccountSuccess();
          }),
          catchError((error: HttpErrorResponse) => {
            return of(deleteUserAccountFailure({ error: error }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserSerivce
  ) {}
}
