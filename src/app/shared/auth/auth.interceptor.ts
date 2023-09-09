import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserState } from '../data-state/states/user.state';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      if (!request.url.includes('token')) {
        const requestClone = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + accessToken)
        });
        return next.handle(requestClone);
      }
      return next.handle(request);
    } else {
      return next.handle(request);
    }
  }
}
