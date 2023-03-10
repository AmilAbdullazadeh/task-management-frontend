import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HasRoleGuard } from './guards/has-role.guard';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [IsAuthenticatedGuard, HasRoleGuard],
    data: {
      isAdmin: true,
    },
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [IsAuthenticatedGuard, HasRoleGuard],
    data: {
      isAdmin: true,
    },
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [IsAuthenticatedGuard, HasRoleGuard],
    data: {
      isAdmin: true,
    },
  },
  {
    path: 'add-task',
    component: AddTaskComponent,
    canActivate: [IsAuthenticatedGuard, HasRoleGuard],
    data: {
      isAdmin: true,
    },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
