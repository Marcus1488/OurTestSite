import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.login('admin', '123')
      .subscribe(
        user => {
          console.log(user);
        },
        error => {
          console.log(error);
        });
  }

}
