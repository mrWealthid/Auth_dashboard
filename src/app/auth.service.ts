import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {environment} from "../environments/environment";
import {User} from "./auth/user.model";

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

export interface IrefreshPayload {
    grant_type: string;
    refresh_token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    currentUser = new BehaviorSubject<User | null>(null);
    refresh: string;
    access: string;

    constructor(private _http: HttpClient) {
    }

    login(value: any): Observable<AuthResponseData> {
        return this._http.post<AuthResponseData>(`${environment.apiUrl}/accounts:signInWithPassword?key=${environment.apiKey}`, value, {withCredentials: false}).pipe(tap((responseData) => {
            this.handleAuthenticatedUser(responseData.email, responseData.localId, +responseData.expiresIn, responseData.idToken, responseData.refreshToken);
        }));
    }

    postData() {
        return this._http.post<AuthResponseData>(`https://testauth-71fea-default-rtdb.firebaseio.com/user:123432.json`, {
            name: 'wealth',
            id: 2233
        });
    };

    //Using the observe give us access to either the response or the body as specifies ==> It can be either response or body!!
    fetchData() {
        return this._http.get(`https://testauth-71fea-default-rtdb.firebaseio.com/user:123432.json`, {
            observe: 'body'
        }).pipe(tap(res => console.log(res)));
    };

    register(value: any): Observable<AuthResponseData> {
        return this._http.post<AuthResponseData>(`${environment.apiUrl}/accounts:signUp?key=${environment.apiKey}`, value).pipe(tap((responseData) => {
            this.handleAuthenticatedUser(responseData.email, responseData.localId, +responseData.expiresIn, responseData.idToken, responseData.refreshToken);
        }));
        // const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
        // const user = new User(responseData.email, responseData.idToken, expirationDate, responseData.localId);
        // this.currentUser.next(user);
        //     .pipe(catchError((err) => {
        //     let errorMessage = "An Error Occured";
        //     if (!err.error || !err.error.message) {
        //         throwError(() => new Error(errorMessage));
        //     }
        //     switch (err.error.errr.message) {
        //         case 'EMAIL_EXISTS':
        //             errorMessage = 'The Email Already Exist';
        //     }
        //     throwError(() => new Error(errorMessage));
        // }));
    }

    //Reset
    // refreshToken(data: any) {
    //     return this._http.post('refresh', data, {withCredentials: true});
    // }
    AutoSiginIn() {
    }

    refreshToken(payload: IrefreshPayload) {
        return this._http.post(`https://securetoken.googleapis.com/v1/token?key=${environment.apiKey}`, payload);
    }

    //Understanding the auth flow...
    //Requirements
    //Login ✔
    //Register ✔
    //AutoLogin ==> Upon Refresh
    //AutoLogout===> When The Token Expires
    //AutoRefresh ===> When the token is refreshed on the background
    getRefreshToken() {
        return this.refresh;
    }

    logout() {
    }

    getAccessToken() {
        return this.access;
    }

    //Logout ✔
    private handleAuthenticatedUser(email: string, userId: string, expiresIn: number, idToken: string, refreshToken: string) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);  // If expiresIn is 3600 ==> an hour expiration;
        const user = new User(email, idToken, expirationDate, userId, refreshToken);
        this.currentUser.next(user);
        this.access = user.token;
        this.refresh = user.refreshToken;
        console.log(user.token);
        // const decoded = helper.decodeToken(idToken);
        // const expired = helper.isTokenExpired(idToken);
        // console.log('Decoded with===>', decoded);
        // console.log('IsExpired===> ', expired);
        // setTimeout(() => {
        //     console.log('IsExpired===> ', expired)
        // }, 36000)
    }
}