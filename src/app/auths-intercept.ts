import {Injectable} from "@angular/core";
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpParams,
    HttpRequest
} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes(':signInWithPassword') || request.url.includes('token')) {
            return next.handle(request);
        }
        // Add the access token to the request header
        request = request.clone({params: new HttpParams().set('auth', this.authService.getAccessToken())});
        return next.handle(request).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    // Check for a refresh token
                    const refreshToken = this.authService.getRefreshToken();
                    if (refreshToken) {
                        // Use the refresh token to request a new access token
                        return this.authService.refreshToken({
                            refresh_token: refreshToken,
                            grant_type: 'refresh_token'
                        }).pipe(
                            switchMap((newAccessToken: any) => {
                                // Update the request header with the new access token
                                request = request.clone({
                                    params: new HttpParams().set('auth', newAccessToken.access_token
                                    )
                                });
                                // Retry the original request
                                return next.handle(request);
                            }),
                            catchError(refreshError => {
                                // If the refresh token request fails, log the user out and clear the tokens
                                this.authService.logout();
                                return throwError(refreshError);
                            })
                        );
                    } else {
                        // If there is no refresh token, log the user out and clear the tokens
                        this.authService.logout();
                        this.router.navigate(['/login']);
                        return throwError(error);
                    }
                } else {
                    return throwError(error);
                }
            })
        );
    }

    isTokenValid(tokenExpiration: any, token: any) {
        if (!tokenExpiration || new Date() > tokenExpiration) {
            return null;
        }
        return token;
    }
}