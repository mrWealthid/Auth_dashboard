import {Action} from "@ngrx/store";

export const LOGIN = 'LOGIN';

export interface CurrentUser {
    email: string,
    token: string,
    tokenExpirationDate: Date,
    userId: string,
    refreshToken: string
}

export interface Ilogin {
    email: string;
    password: string;
}

export class LoginAction implements Action {
    readonly type = LOGIN;

    constructor(public payload: CurrentUser) {
    }
}