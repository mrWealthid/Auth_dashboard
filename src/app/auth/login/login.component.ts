import {Component, OnInit} from '@angular/core';
import {faAt, faCheck, faCircleExclamation, faEye, faEyeSlash, faLock} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {BehaviorSubject} from "rxjs";
import {Iconfig} from "../../password-strength-checker/password-strength-plugin.component";
// import {AuthService} from "../auth.service";
// import {UserAuth} from "../shared/interface/userAuth";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLogin: boolean = true;
  faCircleExclamation = faCircleExclamation;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faCheck = faCheck;
  faLock = faLock;
  faAt = faAt;
  isShown: boolean = false;
  LoginForm: FormGroup;
  email: FormControl;
  password: FormControl<any> | any;
  showModal: boolean = false;
  showMe: boolean = true;
  resetEmail: string;
  passwordStrength = new BehaviorSubject<string>("0");
  public account: any = {
    password: ''
  };
  public barLabel: string = "Password strength:";
  // public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public thresholds = [90, 75, 45, 25];
  // public color: string;
  // public strengthLabels = ['Useless', 'Weak', 'Normal', 'Medium', 'Strong!'];
  public results: Iconfig = {
    upperCase: true,
    lowerCase: true,
    number: true,
    length: 6,
    specialCharacters: true
  };

  // public description: any;
  constructor(public authservice: AuthService, public router: Router, public store: Store) {
  }

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('');
    this.LoginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
    // this.password.valueChanges.subscribe((value: any) => {
    //     this.checkPasswordStrength(value);
    //     this.onPasswordChange(value);
    //     this.displayStrengthColor();
    // });
  }

  togglePassword() {
    this.isShown = !this.isShown;
  }

  // checkPasswordStrength(value: any) {
  //     if (!value) {
  //         this.results = {...this.results, upperCase: false, lowerCase: false, number: false, length: false};
  //     }
  //     if (/[A-Z]/g.test(value)) {
  //         this.results.upperCase = true;
  //     }
  //     if (!/[A-Z]/g.test(value)) {
  //         this.results.upperCase = false;
  //     }
  //     if (/[a-z]/g.test(value)) {
  //         this.results.lowerCase = true;
  //     }
  //     if (!/[a-z]/g.test(value)) {
  //         this.results.lowerCase = false;
  //     }
  //     if (/[0-9]/g.test(value)) {
  //         this.results.number = true;
  //     }
  //     if (!/[0-9]/g.test(value)) {
  //         this.results.number = false;
  //     }
  //     if (/[^\w]/g.test(value)) {
  //         this.results.specialCharacters = true;
  //     }
  //     if (!/[^\w]/g.test(value)) {
  //         this.results.specialCharacters = false;
  //     }
  //     // if (/[!@#$%^&*(),.?":{}|<>]/g.test(value)) {
  //     //     this.results.specialCharacters = true;
  //     // }
  //     // if (!/[!@#$%^&*(),.?":{}|<>]/g.test(value)) {
  //     //     this.results.specialCharacters = false;
  //     // }
  //     if (value.length >= 8) {
  //         this.results.length = true;
  //     }
  //     if (value.length < 8) {
  //         this.results.length = false;
  //     }
  // }
  //
  // onPasswordChange(password?: any) {
  //     let ratingScore = 0;
  //     const totalCriteria = 5;
  //     if (!password) this.passwordStrength.next(0 + "%");
  //     if (password.length >= 8) ratingScore++;
  //     if (/[A-Z]/g.test(password)) ratingScore++;
  //     if (/[a-z]/g.test(password)) ratingScore++;
  //     if (/[0-9]/g.test(password)) ratingScore++;
  //     if (/[^\w]/g.test(password)) ratingScore++;
  //     this.passwordStrength.next((ratingScore / totalCriteria * 100) + "%");
  // }
  //
  // displayStrengthColor() {
  //     let convertedVal: number = 0;
  //     this.passwordStrength.subscribe(x => convertedVal = parseInt(x));
  //     switch (convertedVal) {
  //         case 20:
  //             this.color = this.myColors[0];
  //             this.description = this.strengthLabels[0];
  //             break;
  //         case 40:
  //             this.color = this.myColors[1];
  //             this.description = this.strengthLabels[1];
  //             break;
  //         case 60:
  //             this.color = this.myColors[2];
  //             this.description = this.strengthLabels[2];
  //             break;
  //         case 80:
  //             this.color = this.myColors[3];
  //             this.description = this.strengthLabels[3];
  //             break;
  //         case 100:
  //             this.color = this.myColors[4];
  //             this.description = this.strengthLabels[4];
  //             break;
  //         default:
  //     }
  //     console.log(convertedVal);
  //     // this.passwordStrength.subscribe(val => {
  //     //     convertedVal = parseInt(val);
  //     //
  //     //
  //     //
  //     //
  //     //
  //     //
  //     // });
  // }
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
  toggleForm() {
    this.isLogin = false;
  }

  handleReset() {
    const email = this.resetEmail;
    if (!email) return;
    this.authservice.passwordReset(email).subscribe(res => console.log(res));
  }


  testRouting() {
    this.router.navigateByUrl('/register', {state: {name: "wealth", age: 30, state: "delta", status: "Married"}})
  }

  handleCheckout(val: any) {
    this.authservice.createSession('5c88fa8cf4afda39709c2955').subscribe((x: any) => window.open(x.session.url, 'blank'))

  }

  handleRedirect() {
  
    window.location.href = "https://www.google.com"
  }
}

// export interface IresultMap {
//     upperCase?: boolean,
//     lowerCase?: boolean,
//     number?: boolean
//     specialCharacters?: boolean
//     length?: boolean
// }
