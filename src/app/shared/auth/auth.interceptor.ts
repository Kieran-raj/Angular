import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpensesAuthService } from './expenses-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authService: ExpensesAuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      request.headers.append('UserId', this.authService.domainUser?.id);
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
