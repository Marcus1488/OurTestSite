import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {LoginResponse} from "../interfaces/login";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getUsername() {
    return JSON.parse(localStorage.getItem('user')).username;
  }

  constructor(private http: HttpClient) {
    if (this.getToken()) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<LoginResponse>('/api/user/authenticate', {username: username, password: password})
      .map((res) => {
        let data = res;
        if (data && data.token) {
          this.loggedIn.next(true);
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
        }

        return data.user;
      })
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<LoginResponse>('/api/user/register', {username: username, password: password})
      .map((res) => {
        let data = res;
        if (data && data.token) {
          this.loggedIn.next(true);
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
        }

        return data.user;
      })
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
