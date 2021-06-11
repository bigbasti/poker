import {Component, OnDestroy, OnInit} from '@angular/core';
import {getCurrentLobby, PokerState} from "../state/lobby.reducer";
import {PokerLobbyService} from "../shared/lobby.service";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {map, takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs";
import * as LobbyActions from "../state/lobby.actions"
import {getUser} from "../../state/app.reducer";
import {PokerLobby} from "../shared/lobby.model";

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
        <div class="col-md-9" *ngIf="lobby.creator.id !== (currentUser$ | async).id">
          <h3>Konfiguration</h3>
          <div class="row" style="font-size: x-large;">
            <table cellpadding="5">
              <tr><td>🃏 Spieltyp</td><td  style="width: 100px;">{{lobby.type}}</td><td>💰 Startgeld</td><td>{{lobby.money}}</td></tr>
              <tr><td>💸 Blinds</td><td>{{lobby.smallBlind}} / {{lobby.bigBlind}}</td><td>😴 Max. Inaktivität</td><td>{{lobby.idleTime}}</td></tr>
              <tr><td>🔂 Rundenerhöhung</td><td>{{lobby.intervalRounds}}</td><td>⏰ Zeiterhöhung</td><td>{{lobby.intervalTime}}</td></tr>
            </table>
          </div>
        </div>
        <div class="col-md-9" *ngIf="lobby.creator.id === (currentUser$ | async).id">
          <h3>Konfiguration</h3>
          <div class="row" style="font-size: x-large;">
            <table cellpadding="5">
              <tr><td>🃏 Spieltyp</td><td  style="width: 100px;">{{lobby.type}}</td><td>💰 Startgeld</td><td>{{lobby.money}}</td></tr>
              <tr><td>💸 Blinds</td><td>{{lobby.smallBlind}} / {{lobby.bigBlind}}</td><td>😴 Max. Inaktivität</td><td>{{lobby.idleTime}}</td></tr>
              <tr><td>🔂 Rundenerhöhung</td><td>{{lobby.intervalRounds}}</td><td>⏰ Zeiterhöhung</td><td>{{lobby.intervalTime}}</td></tr>
            </table>
          </div>
        </div>
        <button class="btn btn-outline-dark btn-sm" (click)="leaveLobby()">🚪 Lobby verlassen</button>
<!--        <div class="col-md-3" *ngIf="!(currentUser$ | async) as user">-->
<!--          <h2>Login</h2>-->
<!--          <form (ngSubmit)="performLogin(loginForm.value)" [formGroup]="loginForm">-->
<!--            <fieldset>-->
<!--              <poker-reactive-input-group [class]="'small-group'"-->
<!--                                          [altLabel]="'Ihre E-Mailadresse'"-->
<!--                                          [label]="'E-Mail'"-->
<!--                                          [title]="'Ihre E-Mailadresse'"-->
<!--                                          [name]="'email'"-->
<!--                                          [required]="true"-->
<!--                                          [type]="'text'"-->
<!--                                          formControlName="email"-->
<!--                                          [control]="loginForm.controls.email"></poker-reactive-input-group>-->
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

  onDestroy$ = new Subject();

  currentLobby$ = this.store.select(getCurrentLobby).pipe(
      tap((lobby) => console.log("loading current lobby from lobby detail", lobby)),
      tap(lobby => {
        // if (lobby === null) {this.router.navigate([""]);}
      })
  );
  currentUser$ = this.store.select(getUser);


  constructor(
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
  }

  leaveLobby() {
    this.store.dispatch(LobbyActions.leavePokerLobby());
  }
}
