import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    static accessToken = '';
    static currentUser: any = null;
    test = false;

    constructor(private authService: AuthService) {
        this.authService.currentUser.subscribe(x => AuthInterceptorService.currentUser = x);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // this.authService.currentUser.subscribe(x => AuthInterceptorService.currentUser = x?.token)
        if (req.url.includes(':signInWithPassword')) {
            return next.handle(req);
        } else {
            // if (this.test) {
            //     return next
            //         .handle(req);
            // } else {
            return this.authService.refreshToken({
                grant_type: "refresh_token",
                refresh_token: AuthInterceptorService.currentUser?.refreshToken
            }).pipe(switchMap((newToken: any) => {
                console.log(newToken);
                const modifiedRequest = req.clone({params: new HttpParams().set('auth', AuthInterceptorService.currentUser.token)});
                return next.handle(modifiedRequest);
            }), catchError(() => {
                return throwError(() => 'Invalid Call');
            }));
        }
    }
}

//     return this.authService.currentUser.pipe(take(1), exhaustMap((user) => {
//     // If not it will add params on both signup and login calls
//     console.log(user?.token);
//     AuthInterceptorService.accessToken = user?.token;
//     if (!user) {
//     console.log('No user ===> test');
//     return next.handle(req);
// }
// // If a param needs to be added we can update it with this; using Params in the clone object; if it's header we can do the same!
// const modifiedRequest = req.clone({params: new HttpParams().set('auth', 23)});
// return next.handle(modifiedRequest).pipe(catchError(err => {
//     if (err.status === 401) {
//         this.authService.refreshToken({
//             grant_type: "refresh_token",
//             refresh_token: user.refreshToken
//         }).pipe(tap((res: any) => {
//             // const newToken = AuthInterceptorService.accessToken;
//             // return next.handle(req.clone({
//             //     setHeaders: {
//             //         Authorization: `Bearer ${newToken}`
//             //     }
//             // }));
//             console.log('Next request made', res);
//             // const modifiedRequest = req.clone({params: new HttpParams().set('auth', res.idToken)});
//             // return next.handle(modifiedRequest);
//         }));
//     }
//     return throwError(() => {
//     });
// }));
// }));
// }
// }