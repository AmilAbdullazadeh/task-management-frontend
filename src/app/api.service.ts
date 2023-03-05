import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TaskModel } from './models/task.model';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://task-management-backend-eight.vercel.app/api/';

  login(email: string, password: string) {
    return this.http.post(
      `${this.baseUrl}login`,
      { email, password },
      { responseType: 'text' }
    );
  }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.baseUrl}users`, {
      headers: {},
    });
  }

  getTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${this.baseUrl}tasks`, {
      headers: {},
    });
  }
}
