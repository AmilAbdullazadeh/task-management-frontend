import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserModel } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'https://task-management-backend-eight.vercel.app/api/';

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.baseUrl}users`, {
      headers: {},
    });
  }

  getUser(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUrl}users/${id}`, {
      headers: {},
    });
  }

  addUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}register`, user);
  }

  updateUser(user: UserModel): Observable<UserModel> {
    const url = `${this.baseUrl}/${user?._id}`;
    return this.http.put<UserModel>(url, user);
  }

  deleteUser(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
