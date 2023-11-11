import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import {
  addUpdateUserOption,
  addUpdateUserOptionFailure,
  addUpdateUserOptionSuccess,
  deleteUserAccount,
  deleteUserAccountFailure,
  deleteUserAccountSuccess,
  deleteUserOption,
  deleteUserOptionFailure,
  deleteUserOptionSuccess,
  updateUserDetails,
  updateUserDetailsFailure,
  updateUserDetailsSuccess
} from '../actions/user.action';
import { UserSerivce } from 'src/app/shared/api-services/user/user.service';
import { User } from 'src/app/shared/models/user';
import { ExpensesAuthService } from '../../auth/expenses-auth.service';

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

  deleteUserOptions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserOption),
      mergeMap((action) => {
        return this.userService.deleteUserOptions(action.userOptionIds).pipe(
          map(() => {
            return deleteUserOptionSuccess();
          }),
          catchError((error: HttpErrorResponse) => {
            return of(deleteUserOptionFailure({ error: error }));
          })
        );
      })
    )
  );

  addUpdateUserOptions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUpdateUserOption),
      switchMap((action) => {
        const userOption = JSON.parse(JSON.stringify(action.userOption));
        userOption.UserId = this.expensesAuthService.domainUser.id;
        return this.userService.addUpdateUserOptions(userOption).pipe(
          map(() => addUpdateUserOptionSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(
              addUpdateUserOptionFailure({
                error: error,
                action: action.action
              })
            )
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserSerivce,
    private expensesAuthService: ExpensesAuthService
  ) {}
}
