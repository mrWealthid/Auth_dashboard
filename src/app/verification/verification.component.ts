import {Component, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder} from "@angular/forms";

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

    constructor(private fb: UntypedFormBuilder) {
        this.newForm = fb.group({
            user: '',
            country: '',
            skills: [null]
        });
    }

    get skillValue() {
        return this.newForm.get('skills')?.value;
    }

    ngOnInit(): void {
    }

    handleSubmit() {
        console.log(this.skillValue);
        console.log(this.newForm.value);
    }
}