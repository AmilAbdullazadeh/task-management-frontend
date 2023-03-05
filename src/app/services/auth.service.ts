import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserModel } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'token';
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  user: UserModel | null;

  get token(): any {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private apiService: ApiService) {
    this._isLoggedIn$.next(!!this.token);
    this.user = this.getUser(this.token);
  }

  hasRole(isAdmin: boolean): boolean {
    return this.user?.isAdmin === isAdmin || false;
  }

  login(email: string, password: string) {
    return this.apiService.login(email, password).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem(this.TOKEN_NAME, response);
        this.user = this.getUser(response);
      })
    );
  }

  private getUser(token: string): UserModel | null {
    if (!token) {
      return null;
    }
    return JSON.parse(atob(token.split('.')[1])) as UserModel;
  }
}
