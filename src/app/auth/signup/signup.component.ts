import {Component, OnInit} from '@angular/core';
import {
  faAt,
  faCalendarAlt,
  faCircleExclamation,
  faEye,
  faEyeSlash,
  faLock,
  faPhone,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    faCircleExclamation = faCircleExclamation;
    faUser = faUser;
    faCalendar = faCalendarAlt;
    faPhone = faPhone;
    faAt = faAt;
    faEye = faEye;
    faEyeSlash = faEyeSlash;
    faLock = faLock;
    SignupForm: FormGroup;
    firstname: FormControl;
    lastname: FormControl;
    // DOB: FormControl;
    email: FormControl;
    title: FormControl;
    phone: FormControl;
    password: FormControl;
    isShown: boolean = false;

    constructor(public authservice: AuthService) {
    }

    ngOnInit(): void {
        this.firstname = new FormControl('', Validators.required);
        this.lastname = new FormControl('', Validators.required);
        // this.DOB = new FormControl('', Validators.required);
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.title = new FormControl('', Validators.required);
        this.phone = new FormControl('', Validators.required);
        this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
        this.SignupForm = new FormGroup({
            firstname: this.firstname,
            lastname: this.lastname,
            // DOB: this.DOB,
            email: this.email,
            title: this.title,
            Phone: this.phone,
            password: this.password
        });
    }

    handleRegister(values: any) {
        console.log(values);
        // console.log(values);
        // this.authservice.register(values);
    }

    togglePassword() {
        this.isShown = !this.isShown;
    }

    validateEmail() {
        return !this.email.pristine && /INVALID/i.test(this.email.status);
    }

    validatePassword() {
        return !this.password.pristine && /INVALID/i.test(this.password.status);
    }
}