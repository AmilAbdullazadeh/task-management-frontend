import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TaskModel } from '../models/task.model';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'https://task-management-backend-eight.vercel.app/api/tasks/';

  getTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${this.baseUrl}`);
  }

  getTask(id: string): Observable<TaskModel> {
    const url = `${this.baseUrl}${id}`;
    return this.http.get<TaskModel>(url);
  }

  addTask(task: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(this.baseUrl, task);
  }

  updateTask(task: TaskModel): Observable<TaskModel> {
    const url = `${this.baseUrl}/${task._id}`;
    return this.http.put<TaskModel>(url, task);
  }

  deleteTask(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }

  // const tasks = await Task.find().populate('assignedTo', 'username');
  assignTask(taskId: string, userId: string | null): Observable<TaskModel> {
    const url = `${this.baseUrl}/${taskId}/assign`;
    return this.http.put<TaskModel>(url, { assignedTo: userId });
  }
}
