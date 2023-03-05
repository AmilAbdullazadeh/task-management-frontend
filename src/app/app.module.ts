import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddUserComponent } from './add-user/add-user.component';
import { AngularMaterialModule } from './angular-material/angular-material/angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    NavigationComponent,
    UsersComponent,
    TasksComponent,
    HasRoleDirective,
    AddUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
