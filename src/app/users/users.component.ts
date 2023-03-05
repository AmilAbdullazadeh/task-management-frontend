import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users!: UserModel[];
  displayedColumns: string[] = ['_id', 'name', 'email', 'isAdmin'];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService
      .getUsers()
      .pipe(tap((it) => (this.users = it)))
      .subscribe();
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => this.getUsers());
  }
}
