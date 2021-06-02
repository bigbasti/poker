import {Component, OnInit} from "@angular/core";
import {PokerAuthService} from "./shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Credentials} from "./shared/model/user.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {PokerState} from "./state/app.state";
import {getLoginError, getUser, getUserDetailsError} from "./state/app.reducer";
import * as AppActions from "./state/app.actions";

@Component({
    selector: "poker-login",
    template: `
        <main role="main" class="container">
            <div class="row">
                <div class="col-md-8" *ngIf="currentUser$ | async as user">
                    <poker-lobby-overview></poker-lobby-overview>
                </div>
                <div class="col-md-6" *ngIf="!(currentUser$ | async) as user">
                    <div class="jumbotron">
                        <h1>BigBasti's Crazy Poker 🤪</h1>
                        <p class="lead">Give me your money!!!!</p>
                    </div>
                </div>
                <div class="col-md-3" *ngIf="!(currentUser$ | async) as user">
                    <h2>Login</h2>
                    <form (ngSubmit)="performLogin(loginForm.value)" [formGroup]="loginForm">
                        <fieldset>
                            <poker-reactive-input-group [class]="'small-group'"
                                                        [altLabel]="'Ihre E-Mailadresse'"
                                                        [label]="'E-Mail'"
                                                        [title]="'Ihre E-Mailadresse'"
                                                        [name]="'email'"
                                                        [required]="true"
                                                        [type]="'text'"
                                                        formControlName="email"
                                                        [control]="loginForm.controls.email"></poker-reactive-input-group>
                            <poker-reactive-input-group [class]="'small-group'"
                                                        [altLabel]="'Ihr Passwort'"
                                                        [label]="'Passwort'"
                                                        [name]="'password'"
                                                        [required]="true"
                                                        [type]="'password'"
                                                        formControlName="password"
                                                        [control]="loginForm.controls.password"></poker-reactive-input-group>
                            <p class="text-center">
                                <button type="submit" id="submit-login" class="btn btn-primary"
                                        [disabled]="!loginForm.valid || requestInProgress">Anmelden
                                </button>
                            </p>
                        </fieldset>
                    </form>
                </div>

                <div class="col-md-4" *ngIf="currentUser$ | async as user">
                    <h2>👋 Hi {{user.name}}</h2>
                    <p>Sie verfügen über folgende Berechtigungen:</p>
                    <ul *ngIf="user.permissions">
                        <li *ngFor="let perm of user.permissions">{{perm}}</li>
                    </ul>
                    <div class="alert alert-warning" role="alert" *ngIf="user.permissions.length <= 1">
                        Ihrem Konto wurden bisher keine Berechtigungen zugewiesen, dem entsprechend können Sie nur auf einen
                        geringen Teil der Funktionalität zugreifen. Bitte kontaktieren Sie Ihren Administrator.
                    </div>
                </div>
            </div>
        </main>
    `,
    styles: [`
    `]
})
export class PokerLoginComponent implements OnInit {

    credentialsError$ = this.store.select(getLoginError);
    userDetailsError$ = this.store.select(getUserDetailsError);
    currentUser$ = this.store.select(getUser);

    public loginForm: FormGroup;
    public registerForm: FormGroup;
    public requestInProgress: boolean;

    constructor(
        public auth: PokerAuthService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private store: Store<PokerState>
    ) {
    }

    ngOnInit(): void {
        // create form model for login
        this.loginForm = this.fb.group({
            email: new FormControl("", Validators.required),
            password: new FormControl("", Validators.required)
        });
        // create form model for register
        this.registerForm = this.fb.group({
            displayname: new FormControl("", Validators.required),
            email: new FormControl("", Validators.required),
            password: new FormControl("", Validators.required)
        });
    }

    performLogin(credentials: Credentials): void {
        this.requestInProgress = true;
        this.loginForm.controls.password.setValue("");
        this.loginForm.controls.password.markAsPristine();
        this.store.dispatch(AppActions.loginUser({credentials}));
    }

}