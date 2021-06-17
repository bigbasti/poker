import {Component, OnInit} from "@angular/core";
import {PokerAuthService} from "./shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Credentials, RegisterModel} from "./shared/model/user.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {PokerState} from "./state/app.state";
import {getLoginError, getRegisterError, getRegisterSuccess, getUser, getUserDetailsError} from "./state/app.reducer";
import * as AppActions from "./state/app.actions";
import {R3UsedDirectiveMetadata} from "@angular/compiler";

@Component({
    selector: "poker-login",
    template: `
        <main role="main" class="container">
            <div class="row" *ngIf="!(currentUser$ | async) as user">
                <div class="col-md-9">
                    <div class="jumbotron">
                        <h1>BigBasti's Crazy Poker 🤪</h1>
                        <p class="lead">Give me your money!!!!</p>
                    </div>
                </div>
                <div class="col-md-3" *ngIf="area === 'login'">
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
                            <p class="text-center mt-3">
                                <button type="submit" id="submit-login" class="btn btn-primary"
                                        [disabled]="!loginForm.valid">Anmelden
                                </button>
                                <button class="btn btn-link" (click)="area='register'">Registrieren</button>
                            </p>
                        </fieldset>
                    </form>
                </div>
                <div class="col-md-3" *ngIf="area === 'register'">
                    <h2>Registieren</h2>
                    <div class="alert alert-danger" *ngIf="registerFailure$ | async as regError">Da ging was schief:<br/>{{regError.error}}</div>
                    <div class="alert alert-success" *ngIf="registerSuccess$ | async as regSuccess">Erfolgreich registriert, klick unten auf "zum Login" und logge dich ein.</div>
                    <form (ngSubmit)="performRegistration(registerForm.value)" [formGroup]="registerForm">
                        <fieldset>
                            <poker-reactive-input-group [class]="'small-group'"
                                                        [altLabel]="'Ihre E-Mailadresse'"
                                                        [label]="'E-Mail'"
                                                        [title]="'Ihre E-Mailadresse'"
                                                        [name]="'email'"
                                                        [required]="true"
                                                        [type]="'text'"
                                                        formControlName="email"
                                                        [control]="registerForm.controls.email"></poker-reactive-input-group>
                            <poker-reactive-input-group [class]="'small-group'"
                                                        [altLabel]="'So sehen dich die anderen Spieler'"
                                                        [label]="'Anzeigename'"
                                                        [title]="'Anzeigename'"
                                                        [name]="'name'"
                                                        [required]="true"
                                                        [type]="'text'"
                                                        formControlName="name"
                                                        [control]="registerForm.controls.name"></poker-reactive-input-group>
                            <label class="small-label" for="type">Geschlecht</label>
                            <ng-select labelForId="type"
                                       [items]="genders"
                                       [multiple]="false"
                                       [clearable]="false"
                                       [closeOnSelect]="true"
                                       bindLabel="text"
                                       formControlName="gender">
                            </ng-select>
                            <poker-reactive-input-group [class]="'small-group'"
                                                        [altLabel]="'Ihr Passwort'"
                                                        [label]="'Passwort'"
                                                        [name]="'pass1'"
                                                        [required]="true"
                                                        [type]="'password'"
                                                        formControlName="pass1"
                                                        [control]="registerForm.controls.pass1"></poker-reactive-input-group>
                            <poker-reactive-input-group [class]="'small-group'"
                                                        [altLabel]="'Ihr Passwort wiederholen'"
                                                        [label]="'Passwort wiederholen'"
                                                        [name]="'pass2'"
                                                        [required]="true"
                                                        [type]="'password'"
                                                        formControlName="pass2"
                                                        [control]="registerForm.controls.pass2"></poker-reactive-input-group>
                            <p class="text-center mt-3">
                                <button type="submit" id="submit-login" class="btn btn-primary"
                                        [disabled]="!registerForm.valid">Registrieren
                                </button>
                                <button class="btn btn-link" (click)="area='login'">Zum Login</button>
                            </p>
                        </fieldset>
                    </form>
                </div>
            </div>
            <div class="row" *ngIf="currentUser$ | async as user">
                <div class="col-md-8">
                    <poker-lobby-overview></poker-lobby-overview>
                </div>
                <div class="col-md-4" *ngIf="currentUser$ | async as user">
                    <h2>👋 Hi {{user.name}}</h2>
                    <p>Sie verfügen über folgende Berechtigungen:</p>
                    <ul *ngIf="user.permissions">
                        <li *ngFor="let perm of user.permissions">{{perm}}</li>
                    </ul>
                    <div class="alert alert-warning" role="alert" *ngIf="user.permissions.length <= 1">
                        Ihrem Konto wurden bisher keine Berechtigungen zugewiesen, dem entsprechend können Sie nur auf
                        einen
                        geringen Teil der Funktionalität zugreifen. Bitte kontaktieren Sie Ihren Administrator.
                    </div>
                </div>
            </div>
        </main>
    `,
    styles: [`
        .small-label {
            font-size: 15px;
            margin-bottom: 3px;
        }
    `]
})
export class PokerLoginComponent implements OnInit {

    credentialsError$ = this.store.select(getLoginError);
    userDetailsError$ = this.store.select(getUserDetailsError);
    registerSuccess$ = this.store.select(getRegisterSuccess);
    registerFailure$ = this.store.select(getRegisterError);
    currentUser$ = this.store.select(getUser);

    area = "login";

    genders = [
        {id: "m", text: "Männlein"},
        {id: "f", text: "Weiblein"}
    ];

    public loginForm: FormGroup;
    public registerForm: FormGroup;

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
            name: new FormControl("", Validators.required),
            email: new FormControl("", Validators.required),
            gender: new FormControl(this.genders[0], Validators.required),
            pass1: new FormControl("", Validators.required),
            pass2: new FormControl("", Validators.required)
        });
    }

    performLogin(credentials: Credentials): void {
        this.loginForm.controls.password.setValue("");
        this.loginForm.controls.password.markAsPristine();
        this.store.dispatch(AppActions.loginUser({credentials}));
    }

    performRegistration(value: RegisterModel) {
        console.log("model:", value);
        value.gender = (value.gender as any).id;
        this.store.dispatch(AppActions.registerUser({model: value}));
    }
}