import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
    userSub: Subscription;
    authenticated: boolean = false;

    constructor(public authService: AuthService) {
    }

    ngOnInit(): void {
        this.userSub = this.authService.currentUser.subscribe(user => {
            this.authenticated = !!user;
        });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    logout() {
    }
}