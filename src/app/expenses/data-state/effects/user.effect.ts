import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import {
  userLogin,
  userLoginFailure,
  userLoginSuccess,
} from '../actions/user.action';

@Injectable()
export class UserEffect {
  userlogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userLogin),
      mergeMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((token) => {
            this.authService.isloggedIn.next(true);
            this.authService.setSession(token);
            return userLoginSuccess({ authToken: token });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              userLoginFailure({
                message: error.error.message,
                statusCode: error.status,
              })
            );
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
