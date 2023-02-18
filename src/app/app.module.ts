import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule} from "@angular/router";
import {OverviewComponent} from './overview/overview.component';
import {VerificationComponent} from './verification/verification.component';
import {UsersComponent} from './users/users.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {ngxLoadingAnimationTypes, NgxLoadingModule} from "ngx-loading";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NavbarComponent} from './navbar/navbar.component';
import {StoreModule} from "@ngrx/store";
import {reducers} from "./Reducers";
import {IConfig, NgxMaskModule} from "ngx-mask";
import {AuthInterceptor} from "./auths-intercept";
import {CustomComponent} from "./verification/custom/custom.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {RenameComponent} from './rename/rename/rename.component';
import {Ng9PasswordStrengthBarModule} from "ng9-password-strength-bar";
import {PasswordStrengthPluginComponent} from "./password-strength-checker/password-strength-plugin.component";

const maskConfig: Partial<IConfig> = {
    validation: false,
};

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        OverviewComponent,
        VerificationComponent,
        UsersComponent,
        LoginComponent,
        SignupComponent,
        NavbarComponent,
        CustomComponent,
        RenameComponent,
        PasswordStrengthPluginComponent
    ],
    imports: [
        // provideFirebaseApp(() => initializeApp(environment)),
        // provideFirestore(() => getFirestore()),
        BrowserModule
        , NgxDatatableModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        Ng9PasswordStrengthBarModule,
        NgxMaskModule.forRoot(maskConfig),
        StoreModule.forRoot(reducers)
        , RouterModule.forRoot([
            {
                path: '', redirectTo: "dashboard", pathMatch: "full"
            },
            {path: 'login', component: LoginComponent},
            {path: 'register', component: SignupComponent},
            {
                path: 'dashboard',
                component: DashboardComponent,
                children: [{path: '', component: OverviewComponent, pathMatch: 'full'}, {
                    path: 'verification',
                    component: VerificationComponent
                }, {path: 'user', component: UsersComponent}]
            }
        ]),
        NgxLoadingModule.forRoot({
            animationType: ngxLoadingAnimationTypes.rotatingPlane,
            backdropBackgroundColour: "rgba(0,0,0,0.1)",
            backdropBorderRadius: "4px",
            primaryColour: "green",
            secondaryColour: "red",
            tertiaryColour: "blue",
        }), FontAwesomeTestingModule, FormsModule, NgSelectModule
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
    bootstrap: [AppComponent]
})
export class AppModule {
}