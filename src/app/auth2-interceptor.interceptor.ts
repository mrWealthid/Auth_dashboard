import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {AuthService} from "./auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Injectable()
export class Auth2InterceptorInterceptor implements HttpInterceptor {
    static response: any;

    constructor(private authService: AuthService) {
        this.authService.currentUser.subscribe(res => {
            console.log('Got the current user details', res);
            Auth2InterceptorInterceptor.response = res;
        });
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (!request.url.includes(':signInWithPassword')) {
            console.log('req');
            console.log(Auth2InterceptorInterceptor.response._token);
            const expired = helper.isTokenExpired(Auth2InterceptorInterceptor.response._token);
            console.log(expired);
            if (!expired) {
                console.log("Hi");
                this.authService.refreshToken({
                    grant_type: "refresh_token",
                    refresh_token: Auth2InterceptorInterceptor.response.refreshToken
                }).pipe(switchMap(res => {
                        console.log('second request', res);
                        return next.handle(request.clone({params: new HttpParams().set('auth', 45666)}));
                    })
                );
            }
        }
        // const modifiedRequest = request.clone({params: new HttpParams().set('auth', Auth2InterceptorInterceptor.response._token)});
        return next.handle(request);
    }
}