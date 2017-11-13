import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    return this.http.post('http://localhost:3000/user/authenticate', {username: username, password: password}, {headers: headers})
      .map((res) => {
        let user = res['user'];
        if (user && user.token) {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', user.token);
        }

        return user;
      })
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
