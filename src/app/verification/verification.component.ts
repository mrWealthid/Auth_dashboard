import {Component, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder} from "@angular/forms";
import {catchError, Observable, of, startWith, switchMap, tap} from "rxjs";

@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
    rows = [
        {
            name: "mercy",
            age: 10,
            town: "Nairobi",
            country: "kenya",
            color: "kenya",
            test: "kenya",
            sex: "kenya",
            tests: "kenya",
            sexs: "kenya"
        },
        {
            name: "Vincent",
            age: 40,
            town: "Kampala",
            country: "Uganda",
            color: "kenya",
            test: "kenya",
            sex: "kenya",
            tests: "kenya",
            sexs: "kenya"
        },
        {
            name: "Wesley",
            age: 41,
            town: "Cairo",
            country: "Egypt",
            color: "kenya",
            test: "kenya",
            sex: "kenya",
            tests: "kenya",
            sexs: "kenya"
        }
    ];
    newForm: FormGroup;
    loadingBillers: any;
    service: Observable<any>;
    billers: Observable<any> = of([{
        billerId: 1,
        billerName: "fresh"
    },
        {
            billerId: 2,
            billerName: "tested"
        }
    ]);
    private valueChangesSub: any;

    constructor(private fb: UntypedFormBuilder) {
        this.newForm = fb.group({
            user: '',
            country: '',
            skills: [null],
            biller: [null],
            service: [null]
        });
    }

    get skillValue() {
        return this.newForm.get('skills')?.value;
    }

    ngOnInit(): void {
        this.updateFormChanges();
    }

    getBillerProducts(billId: string | null): Observable<[]> {
        return billId ? this.fetchValue(billId) : of([]);
    }

    registerOnChange(onChange: any): void {
        this.valueChangesSub = this.newForm.valueChanges.subscribe(onChange);
    }

    registerOnTouched(onTouched: any): void {
        this.onTouched = onTouched;
    }

    fetchValue(val: any): any {
        if (val === 1) {
            return of([{
                name: "airtime", id: 34,
            },
                {
                    name: "data", id: 46
                }]);
        } else {
            return of([{
                name: "Movies", id: 34,
            },
                {
                    name: "Swimming", id: 46
                }]);
        }
    }

    handleError(val: any) {
        console.error(val);
    }

    handleSubmit() {
        console.log(this.skillValue);
        console.log(this.newForm.value);
    }

    onTouched = () => {
    };

    private updateFormChanges(): void {
        // @ts-ignore
        this.service = this.newForm?.get("biller")
            .valueChanges
            .pipe(
                tap((val: any) => {
                    if (val) {
                        this.newForm.get("service")?.setValue(null);
                    }
                }),
                startWith(null),
                switchMap((this.getBillerProducts.bind(this))),
                catchError(() => of([])));
    }
}