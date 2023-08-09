import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import {
  checkSignUpDetails,
  setCheckMessage,
  signUp,
  signUpFailure,
  signUpSuccess,
  updateUserDetails,
  updateUserDetailsFailure,
  updateUserDetailsSuccess,
  userLogin,
  userLoginFailure,
  userLoginSuccess
} from '../actions/user.action';
import { UserSerivce } from 'src/app/shared/api-services/user/user.service';
import { User } from 'src/app/shared/models/user';

@Injectable()
export class UserEffect {
  userlogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userLogin),
      mergeMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((token) => {
            this.authService.isloggedIn$.next(true);
            this.authService.setSession(token);
            return userLoginSuccess({ authToken: token });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              userLoginFailure({
                message: error.error.message,
                statusCode: error.status
              })
            );
          })
        );
      })
    )
  );

  checkDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkSignUpDetails),
      mergeMap((action) => {
        return this.authService
          .checkDetails(action.email, action.displayName)
          .pipe(
            map((response) => {
              return setCheckMessage({ response: response });
            }),
            catchError((error: HttpErrorResponse) => {
              const newResponse = {
                statusCode: error.status,
                message: error.error.message,
                canAdd: false
              };
              return of(signUpFailure({ response: newResponse }));
            })
          );
      })
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      mergeMap((action) => {
        return this.authService.signUp(action.userDetails).pipe(
          map(() => signUpSuccess()),
          catchError((error: HttpErrorResponse) => {
            const newResponse = {
              statusCode: error.status,
              message: error.error.message,
              canAdd: false
            };
            return of(signUpFailure({ response: newResponse }));
          })
        );
      })
    )
  );

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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserSerivce
  ) {}
}
