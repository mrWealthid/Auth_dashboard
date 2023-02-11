import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {BehaviorSubject, Subscription} from "rxjs";

@Component({
    selector: "password-strength-plugin",
    templateUrl: "./password-strength-plugin.component.html",
    styleUrls: ["./password-strength-plugin.css"]
})
export class PasswordStrengthPluginComponent implements OnInit, OnDestroy {
    passwordStrength$ = new BehaviorSubject<string>("0");
    color$ = new BehaviorSubject<string>("");
    strengthDescription$ = new BehaviorSubject<string>("");
    subscription: Subscription;
    @Input() config: Iconfig = {
        upperCase: true,
        lowerCase: true,
        number: true,
        specialCharacters: true,
        length: 6
    };
    @Input() strengthLabels: Array<string> = ["Poor", "Weak", "Normal", "Medium", "Strong!"];
    @Input() strengthColors: Array<string> = ["#DD2C00", "#f16521", "#FFD600", "#AEEA00", "#1CA78B"];
    @Input() control;
    private _privateConfig: IconfigUpdates;

    constructor() {
    }

    ngOnInit(): void {
        this.subscription = this.control?.valueChanges.subscribe((value) => {
            this.calcPasswordScores(value);
            this.displayStrengthColor();
            // this.updateErrorStatus();
            console.log(value);
        });
        this.updateConfig();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    calcPasswordScores(password?: any) {
        let ratingScore = 0;
        const totalCriteria = Object.keys(this.config).length;
        if (!password) return this.passwordStrength$.next(0 + "%");
        if (
            this._privateConfig.length.shouldCheck &&
            (this._privateConfig.upperCase.isValid = password?.length >= this._privateConfig.length.value)
        ) {
            this._privateConfig.length.isValid = true;
            ratingScore++;
        }
        if (
            this._privateConfig.upperCase.shouldCheck &&
            (this._privateConfig.upperCase.isValid = /[A-Z]/g.test(password))
        ) {
            ratingScore++;
        }
        if (
            this._privateConfig.lowerCase.shouldCheck &&
            (this._privateConfig.lowerCase.isValid = /[a-z]/g.test(password))
        ) {
            ratingScore++;
        }
        if (this._privateConfig.number.shouldCheck && (this._privateConfig.number.isValid = /[0-9]/g.test(password))) {
            ratingScore++;
        }
        if (
            this._privateConfig.specialCharacters.shouldCheck &&
            (this._privateConfig.specialCharacters.isValid = /[^\w]/g.test(password))
        ) {
            ratingScore++;
        }
        this.passwordStrength$.next((ratingScore / totalCriteria) * 100 + "%");
    }

    displayStrengthColor() {
        let convertedVal: number = 0;
        this.passwordStrength$.subscribe((x) => (convertedVal = parseInt(x)));
        switch (true) {
            case convertedVal <= 20:
                this.color$.next(this.strengthColors[0]);
                this.strengthDescription$.next(this.strengthLabels[0]);
                break;
            case convertedVal > 20 && convertedVal <= 40:
                this.color$.next(this.strengthColors[1]);
                this.strengthDescription$.next(this.strengthLabels[1]);
                break;
            case convertedVal > 40 && convertedVal <= 60:
                this.color$.next(this.strengthColors[2]);
                this.strengthDescription$.next(this.strengthLabels[2]);
                break;
            case convertedVal > 60 && convertedVal <= 80:
                this.color$.next(this.strengthColors[3]);
                this.strengthDescription$.next(this.strengthLabels[3]);
                break;
            case convertedVal > 80 && convertedVal <= 100:
                this.color$.next(this.strengthColors[4]);
                this.strengthDescription$.next(this.strengthLabels[4]);
                break;
            default:
        }
    }

    updateErrorStatus() {
        const error = [];
        if (!this._privateConfig.lowerCase.isValid) {
            error.push("Must include a lower case character");
        }
        if (!this._privateConfig.upperCase.isValid) {
            error.push("Must include an upper case character");
        }
        if (!this._privateConfig.number.isValid) {
            error.push("Must include a number");
        }
        if (!this._privateConfig.length.isValid) {
            error.push("min-length must be six");
        }
        return this.control.setErrors({
            ...this.control.errors,
            generalError: error.length > 0 ? {text: error} : null
        });
    }

    private updateConfig() {
        this._privateConfig = {
            upperCase: {
                shouldCheck: this.config.upperCase,
                isValid: false
            },
            lowerCase: {
                shouldCheck: this.config.lowerCase,
                isValid: false
            },
            number: {
                shouldCheck: this.config.number,
                isValid: false
            },
            length: {
                shouldCheck: this.config.length > 0,
                isValid: false,
                value: this.config.length
            },
            specialCharacters: {
                shouldCheck: this.config.specialCharacters || false,
                isValid: false
            }
        };
    }
}

export interface Iconfig {
    upperCase: boolean;
    lowerCase: boolean;
    number: boolean;
    specialCharacters?: boolean;
    length?: number;
}

export interface IconfigUpdates {
    upperCase: Icheckers;
    lowerCase: Icheckers;
    number: Icheckers;
    specialCharacters?: Icheckers;
    length?: Icheckers;
}

export interface Icheckers {
    shouldCheck: boolean;
    isValid: boolean;
    value?: number;
}