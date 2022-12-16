import {Component, OnInit} from '@angular/core';

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

    constructor() {
    }

    ngOnInit(): void {
    }
}