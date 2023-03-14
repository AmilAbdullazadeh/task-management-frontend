import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { TaskService } from './../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  users!: UserModel[];
  selected = '';

  form = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    assignedTo: ['', [Validators.required]],
  });

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private router: Router,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService
      .getUsers()
      .pipe(tap((it) => (this.users = it)))
      .subscribe();
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.taskService.addTask(this.form.value).subscribe((response) => {
      this.router.navigate(['/tasks']);
    });
  }
}
