import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TaskModel } from '../models/task.model';
import { UserService } from '../services/user.service';
import { UserModel } from './../models/user.model';
import { TaskService } from './../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks!: TaskModel[];
  users!: UserModel[];
  displayedColumns: string[] = ['_id', 'title', 'description', 'assignedTo'];

  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService
      .getTasks()
      .pipe(tap((it) => (this.tasks = it)))
      .subscribe(() => {
        this.getUsers();
      });
  }

  getUsers(): void {
    this.userService
      .getUsers()
      .pipe(tap((it) => (this.users = it)))
      .subscribe(() => {
        this.findUserNames();
      });
  }

  findUserNames() {
    this.tasks.forEach((task) => {
      const user = this.users.find((user) => user._id === task.assignedTo._id);
      task.assignedTo._id = user ? user.name : 'Unknown user';
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => this.getTasks());
  }

  assignTask(task: TaskModel, userId: string): void {
    this.taskService.assignTask(task._id!, userId).subscribe(() => {
      task.assignedTo._id = userId;
    });
  }

  unassignTask(task: TaskModel): void {
    this.taskService.assignTask(task._id!, null).subscribe(() => {
      task.assignedTo._id = null;
    });
  }
}
