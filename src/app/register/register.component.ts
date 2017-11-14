import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  private username: string = '';
  private password: string = '';
  private confirmPassword: string = '';

  usernameFormControl = new FormControl('', [
    Validators.required
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  confirmPasswordFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    if (this.password === this.confirmPassword) {
      this.authService.register(this.username, this.password)
        .subscribe(
          user => {
            this.router.navigate(["/"]);
          },
          error => {
            console.log(error);
          });
    }
  }
}
