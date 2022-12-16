import {Component, OnInit} from '@angular/core';
import {faAt, faCircleExclamation, faEye, faEyeSlash, faLock} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
// import {AuthService} from "../auth.service";
// import {UserAuth} from "../shared/interface/userAuth";
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    faCircleExclamation = faCircleExclamation;
    faEye = faEye;
    faEyeSlash = faEyeSlash;
    faLock = faLock;
    faAt = faAt;
    isShown: boolean = false;
    LoginForm: FormGroup;
    email: FormControl;
    password: FormControl;
    showModal: boolean = false;
    showMe: boolean = true;

    constructor(public authservice: AuthService, public router: Router, public store: Store) {
    }

    ngOnInit(): void {
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
        this.LoginForm = new FormGroup({
            email: this.email,
            password: this.password,
        });
    }

    togglePassword() {
        this.isShown = !this.isShown;
    }

    handleLogin(value: any) {
        if (!this.LoginForm.valid) return;
        // this.authservice.login(value);
        console.log({...value, returnSecureToken: true});
        this.authservice.login({
            ...value,
            returnSecureToken: true
        }).subscribe((val) => {
            console.log(val);
            this.router.navigate(['dashboard']);
        }), (error: any) => console.log(error);
    }

    validateEmail() {
        return !this.email.pristine && /INVALID/i.test(this.email.status);
    }

    validatePassword() {
        return !this.password.pristine && /INVALID/i.test(this.password.status);
    }

    // handleModal($event: any) {
    //     console.log("I Bubbled", $event);
    //     this.showModal = $event;
    // }
    // toggleModal() {
    //     this.showModal = !this.showModal;
    //     this.showMe = true;
    // }
}