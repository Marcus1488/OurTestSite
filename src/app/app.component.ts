import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isLoggedIn$: Observable<boolean>;
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.username = this.authService.getUsername();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

}
