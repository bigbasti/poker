import {Component, OnDestroy, OnInit} from '@angular/core';
import {getCurrentLobby, PokerState} from "../state/lobby.reducer";
import {PokerLobbyService} from "../shared/lobby.service";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {map, takeUntil, tap} from "rxjs/operators";
import {combineLatest, Subject} from "rxjs";
import * as LobbyActions from "../state/lobby.actions"
import {getUser} from "../../state/app.reducer";
import {PokerLobby} from "../shared/lobby.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "poker-lobby",
  template: `
    <main role="main" class="container" *ngIf="currentLobby$ | async as lobby">
      <h1>Lobby {{lobby.name}}</h1>
      <div class="row">
        <div class="col-md-3" >
          <h3>Spieler</h3>
          <ul style="list-style: none; font-size: x-large;">
            <li *ngIf="lobby.player1"><span title="Lobbyadmin">👑</span> {{lobby.player1.name}}</li>
            <li *ngIf="lobby.player2">👨 {{lobby.player2.name}}</li>
            <li *ngIf="lobby.player3">👨 {{lobby.player3.name}}</li>
            <li *ngIf="lobby.player4">👨 {{lobby.player4.name}}</li>
            <li *ngIf="lobby.player5">👨 {{lobby.player5.name}}</li>
            <li *ngIf="lobby.player6">👨 {{lobby.player6.name}}</li>
            <li *ngIf="lobby.player7">👨 {{lobby.player7.name}}</li>
            <li *ngIf="lobby.player8">👨 {{lobby.player8.name}}</li>
          </ul>
        </div>
        <div class="col-md-9" *ngIf="!(isLobbyAdmin$ | async)">
          <h3>Konfiguration</h3>
          <div class="row" style="font-size: x-large;">
            <table cellpadding="5">
              <tr><td>🃏 Spieltyp</td><td  style="width: 100px;">{{lobby.type}}</td><td>💰 Startgeld</td><td>{{lobby.money}}</td></tr>
              <tr><td>💸 Blinds</td><td>{{lobby.smallBlind}} / {{lobby.bigBlind}}</td><td>😴 Max. Inaktivität</td><td>{{lobby.idleTime}}</td></tr>
              <tr><td>🔂 Rundenerhöhung</td><td>{{lobby.intervalRounds}}</td><td>⏰ Zeiterhöhung</td><td>{{lobby.intervalTime}}</td></tr>
            </table>
          </div>
        </div>
        <div class="col-md-9" *ngIf="(isLobbyAdmin$ | async)">
          <h3>Konfiguration</h3>
          <div class="row" style="font-size: x-large;">
            <form [formGroup]="lobbyForm">
            <table cellpadding="5">
              <tr>
                <td colspan="2">
                <poker-reactive-input-group [class]="'small-group'"
                                            [altLabel]="'🃏 Spieltyp'"
                                            [label]="'🃏 Spieltyp'"
                                            [title]="'🃏 Spieltyp'"
                                            [name]="'type'"
                                            [required]="true"
                                            [type]="'text'"
                                            formControlName="type"
                                            [control]="lobbyForm.controls.type"></poker-reactive-input-group>
                </td>
                <td>
                <poker-reactive-input-group [class]="'small-group'"
                                            [altLabel]="'💰 Startgeld'"
                                            [label]="'💰 Startgeld'"
                                            [title]="'💰 Startgeld'"
                                            [name]="'money'"
                                            [required]="true"
                                            [type]="'text'"
                                            formControlName="money"
                                            [control]="lobbyForm.controls.money"></poker-reactive-input-group>
                </td>
              </tr>
              <tr>
                <td>
                <poker-reactive-input-group [class]="'small-group'"
                                            [altLabel]="'💸 Small Blind'"
                                            [label]="'💸 Small Blind'"
                                            [title]="'💸 Small Blind'"
                                            [name]="'smallBlind'"
                                            [required]="true"
                                            [type]="'text'"
                                            formControlName="smallBlind"
                                            [control]="lobbyForm.controls.smallBlind"></poker-reactive-input-group>
                </td><td>
                <poker-reactive-input-group [class]="'small-group'"
                                            [altLabel]="'💸 Big Blind'"
                                            [label]="'💸 Big Blind'"
                                            [title]="'💸 Big Blind'"
                                            [name]="'bigBlind'"
                                            [required]="true"
                                            [type]="'text'"
                                            formControlName="bigBlind"
                                            [control]="lobbyForm.controls.bigBlind"></poker-reactive-input-group>
              </td>
                <td>
                <poker-reactive-input-group [class]="'small-group'"
                                            [altLabel]="'😴 Max. Inaktivität'"
                                            [label]="'😴 Max. Inaktivität (Sekunden)'"
                                            [title]="'😴 Max. Inaktivität'"
                                            [name]="'idleTime'"
                                            [required]="true"
                                            [type]="'text'"
                                            formControlName="idleTime"
                                            [control]="lobbyForm.controls.idleTime"></poker-reactive-input-group>
              </td>
              </tr>
              <tr><td colspan="2">
                <poker-reactive-input-group [class]="'small-group'"
                                            [altLabel]="'🔂 Rundenerhöhung'"
                                            [label]="'🔂 Rundenerhöhung'"
                                            [title]="'Blinderhöhung alle __ Runden (0 = keine Rundenerhöhung)'"
                                            [name]="'intervalRounds'"
                                            [required]="true"
                                            [type]="'text'"
                                            formControlName="intervalRounds"
                                            [control]="lobbyForm.controls.intervalRounds"></poker-reactive-input-group>
              </td><td>
                <poker-reactive-input-group [class]="'small-group'"
                                            [altLabel]="'⏰ Zeiterhöhung'"
                                            [label]="'⏰ Zeiterhöhung (Minuten)'"
                                            [title]="'Blinderhöhung alle __ Minuten (0 = keine Zeiterhöhung)'"
                                            [name]="'intervalTime'"
                                            [required]="true"
                                            [type]="'text'"
                                            formControlName="intervalTime"
                                            [control]="lobbyForm.controls.intervalTime"></poker-reactive-input-group>
              </td></tr>
            </table>
            </form>
          </div>
        </div>
        <button class="btn btn-outline-dark btn-sm" (click)="leaveLobby()">🚪 Lobby verlassen</button>
<!--        <div class="col-md-3" *ngIf="!(currentUser$ | async) as user">-->
<!--          <h2>Login</h2>-->
<!--          <form (ngSubmit)="performLogin(loginForm.value)" [formGroup]="loginForm">-->
<!--            <fieldset>-->

<!--              <poker-reactive-input-group [class]="'small-group'"-->
<!--                                          [altLabel]="'Ihr Passwort'"-->
<!--                                          [label]="'Passwort'"-->
<!--                                          [name]="'password'"-->
<!--                                          [required]="true"-->
<!--                                          [type]="'password'"-->
<!--                                          formControlName="password"-->
<!--                                          [control]="loginForm.controls.password"></poker-reactive-input-group>-->
<!--              <p class="text-center">-->
<!--                <button type="submit" id="submit-login" class="btn btn-primary"-->
<!--                        [disabled]="!loginForm.valid || requestInProgress">Anmelden-->
<!--                </button>-->
<!--              </p>-->
<!--            </fieldset>-->
<!--          </form>-->
<!--        </div>-->

      </div>
    </main>
  `,
  styles: [
  ]
})
export class PokerLobbyComponent implements OnInit, OnDestroy {

  public lobbyForm: FormGroup;
  public requestInProgress: boolean;

  onDestroy$ = new Subject();

  currentLobby$ = this.store.select(getCurrentLobby).pipe(
      tap((lobby) => console.log("loading current lobby from lobby detail", lobby)),
      tap(lobby => {
        // if (lobby === null) {this.router.navigate([""]);}
      }),
      tap(lobby => this.lobbyForm.patchValue(lobby))
  );
  currentUser$ = this.store.select(getUser);

  isLobbyAdmin$ = combineLatest([this.currentLobby$, this.currentUser$]).pipe(
    map(([lobby, user]) => lobby.creator.id === user.id)
  );


  constructor(
      private fb: FormBuilder,
      private lobbyService: PokerLobbyService,
      private store: Store<PokerState>,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
  }

  ngOnInit(): void {
    this.store.dispatch(LobbyActions.loadCurrentLobby());

    this.lobbyForm = this.fb.group({
      type: new FormControl("", [Validators.required, Validators.maxLength(45), Validators.minLength(5)]),
      money: new FormControl(5000, [Validators.required, Validators.min(100), Validators.max(10000000)]),
      smallBlind: new FormControl(5, [Validators.required, Validators.min(1), Validators.max(100000)]),
      bigBlind: new FormControl(10, [Validators.required, Validators.min(5), Validators.max(200000)]),
      idleTime: new FormControl(60, [Validators.required, Validators.min(15), Validators.max(600)]),
      intervalRounds: new FormControl(10, [Validators.required, Validators.max(100)]),
      intervalTime: new FormControl(10, [Validators.required, Validators.max(60)])
    });
  }

  leaveLobby() {
    this.store.dispatch(LobbyActions.leavePokerLobby());
  }
}
