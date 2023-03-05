import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  fakeToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDAxYWFhNGI2N2U5YWViZGEyODZhMzkiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NzgwMDY4NDh9.LTqzTD5oVjfV515PcK94qcQ-jutVJwTbXLmtzmnQNL8';

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers: request.headers.set(
        'authorization',
        this.authService.token || this.fakeToken
      ),
    });

    return next.handle(request);
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
