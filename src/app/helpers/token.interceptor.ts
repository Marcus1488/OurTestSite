import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthService);

    /*req = req.clone({
      setHeaders: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Accept': 'application/json',
       // 'Authorization': `Bearer ${auth.getToken()}`
      }
    });*/

    console.log("new headers", req.headers.keys());
    return next.handle(req)
  }
}
