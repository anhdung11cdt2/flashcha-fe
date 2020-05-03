import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, from, throwError } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { switchMap, map } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        return this.handleAsync(req).pipe(switchMap((authReq => {
            return next.handle(authReq)
        })))
    }
    handleAsync(req: HttpRequest<any>) {
        return this.auth.getAuthToken().pipe(map(authToken => {
            console.log(authToken);
            const authReq = req.clone({
                headers: req.headers.set('Authorization', authToken)
            })
            return authReq
        }, err => {throwError(err)}))
    }
}