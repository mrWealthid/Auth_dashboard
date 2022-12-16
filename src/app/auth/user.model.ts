export class User {
    constructor(public email: string, private _token: string, private _tokenExpirationDate: Date, public userId: string, public refreshToken: string) {
    }

    get token(): any {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}