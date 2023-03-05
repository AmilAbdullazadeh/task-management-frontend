import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  roles: string[] = ['admin', 'user'];
  selected = 'user';

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    isAdmin: [false, [Validators.required]],
  });

  constructor(
    private userService: UserService,
    private router: Router,
    public fb: FormBuilder
  ) {}

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.form.controls['isAdmin'].setValue(
      this.selected === 'admin' ? true : false
    );

    this.userService.addUser(this.form.value).subscribe((response) => {
      this.router.navigate(['/users']);
    });
  }
}
