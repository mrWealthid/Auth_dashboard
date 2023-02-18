import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";
import {debounceTime, delay, map, Observable, of, tap} from "rxjs";
import {AuthService} from "../auth.service";
import {HttpClient} from "@angular/common/http";
import {DateFormControl} from "../date-form-control";
// interface IObjectKeys {
//     [key: string]: string | number;
// }
@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    firstName: FormControl;
    phone: FormControl;
    email: FormControl;
    testForm: FormGroup;
    forbiddenWords = ['agents', 'aggregators'];
    cardNumber: FormControl;
    cardNumberMask: FormControl;
    isVerify = false;
    testValue: Observable<any> = of('wealth@gmail.com');
    posts: any[];

    constructor(private fb: UntypedFormBuilder, private authService: AuthService, private _http: HttpClient) {
    }

    get skillsValue() {
        return this.testForm.get('skills')?.value;
    }

    onTouched = () => {
    };

    ngOnInit(): void {
        this.firstName = new FormControl(null, [Validators.required, this.customValidator.bind(this)]);
        this.phone = new FormControl(null, [Validators.required, this.additionalValidator.bind(this)]);
        this.email = new FormControl(null, [Validators.required], this.forbiddenEmail2.bind(this));
        this.cardNumber = new DateFormControl(null);
        this.cardNumberMask = new FormControl(null);
        this.testForm = new FormGroup<any>({
            firstName: this.firstName,
            phone: this.phone,
            email: this.email,
            cardNumber: this.cardNumber,
            cardNumberMask: this.cardNumberMask
        });
        this.testForm.valueChanges.subscribe(value => console.log(value));
        this.testForm.statusChanges.subscribe(value => console.log(value));
        // this.email.statusChanges.subscribe(value => {
        //     if (/PENDING/.rename(value)) {
        //         this.isVerify = true;
        //     }
        // });
        // ==============================> Form Builder
        //using formbuilder
        // this.testForm = this.fb.group({
        //     firstName: [null, [Validators.required, this.customValidator.bind(this)]],
        //     phone: [null, [Validators.required, this.additionalValidator.bind(this)]]
        // });
        this.testForm = this.fb.group({
            skills: [''],
            gender: ['']
        });
        this.testValue.subscribe(val => console.log('Observable==>', val));
        // this.authService.postData().subscribe();
        let idtoken = this.authService.getAccessToken();
        this.authService.fetchData().subscribe();
        this.authService.updateProfile({
            displayName: "Mr-Wealth",
            idToken: idtoken,
            photoUrl: '',
            returnSecureToken: true
        }).subscribe();
        this.authService.fetchData().pipe(map((res: any) => {
            const postArray = [];
            for (const key in res) {
                //We did this so we are sure we aren't accessing the prototype key
                if (res.hasOwnProperty(key)) {
                    postArray.push({...res[key], id: key});
                }
            }
            return postArray;
        })).subscribe(resp => this.posts = resp);
        this.authService.getUserInfo().subscribe(res => console.log(res));
    }

    //How to add Custom validator in angular
    handleSubmit() {
        console.log(this.skillsValue);
        console.log(this.testForm.value);
    }

    customValidator(control: AbstractControl): any {
        if (this.forbiddenWords.indexOf(control.value) !== -1) {
            return {'forbidden': true};
        }
        return null;
    }

    patchValue() {
        this.testForm.patchValue({
            gender: "fresh"
        });
    }

    additionalValidator(control: AbstractControl): any {
        // console.log(typeof (control.value));
        if (control.value) {
            if ((control.value.replace(/\s/g, '')).length === 11) {
                return null;
            }
            return {'numb': true};
        }
    }

    //Using a promise
    forbiddenEmail(control: AbstractControl): Promise<any> | Observable<any> {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === "wealth@gmail.com") {
                    resolve({'forbiddenEmail': true});
                } else {
                    resolve(null);
                }
            }, 3000);
        });
        return promise;
    }

    //using an Observable
    //To return an observable we use the map instead of subscribe
    forbiddenEmail2(control: AbstractControl): Promise<any> | Observable<any> {
        return this._http.get('fresh.com').pipe(debounceTime(5000)).pipe(map(val => {
            if (control.value === val) {
                return {'forbiddenEmail': true};
            } else {
                return null;
            }
        }), debounceTime(3000), delay(1000), tap(() => console.log('Testing Debounce')));
    }
}