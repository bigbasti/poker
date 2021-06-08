import {Component, OnDestroy, OnInit} from '@angular/core';
import {getCurrentLobby, PokerState} from "../state/lobby.reducer";
import {PokerLobbyService} from "../shared/lobby.service";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {map, takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs";
import * as LobbyActions from "../state/lobby.actions"

@Component({
  selector: "poker-lobby",
  template: `
    <main role="main" class="container" *ngIf="currentLobby$ | async as lobby">
      <h1>Lobby {{lobby.name}}</h1>
      <div class="row">
        <div class="col-md-3" >
          <h3>Spieler</h3>
          <ul>
            <li *ngIf="lobby.player1">{{lobby.player1.name}}</li>
            <li *ngIf="lobby.player2">{{lobby.player2.name}}</li>
            <li *ngIf="lobby.player3">{{lobby.player3.name}}</li>
            <li *ngIf="lobby.player4">{{lobby.player4.name}}</li>
            <li *ngIf="lobby.player5">{{lobby.player5.name}}</li>
            <li *ngIf="lobby.player6">{{lobby.player6.name}}</li>
            <li *ngIf="lobby.player7">{{lobby.player7.name}}</li>
            <li *ngIf="lobby.player8">{{lobby.player8.name}}</li>
          </ul>
        </div>
        <div class="col-md-9">
            <h3>Konfiguration</h3>
        </div>
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

  currentLobby$ = this.store.select(getCurrentLobby);
  lobbyId$ = this.route.params.pipe(
      tap(params => console.log("lobby id:", params.id)),
      map(params => params.id),
      takeUntil(this.onDestroy$)
  )
  ;

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
  }

}
