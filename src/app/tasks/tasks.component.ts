import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { TaskModel } from '../models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks!: TaskModel[];
  displayedColumns: string[] = ['_id', 'title', 'description', 'assignedTo'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .getTasks()
      .pipe(tap((it) => (this.tasks = it)))
      .subscribe();
  }
}
