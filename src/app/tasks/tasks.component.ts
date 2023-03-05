import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TaskModel } from '../models/task.model';
import { TaskService } from './../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks!: TaskModel[];
  displayedColumns: string[] = ['_id', 'title', 'description', 'assignedTo'];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService
      .getTasks()
      .pipe(tap((it) => (this.tasks = it)))
      .subscribe();
  }
}
