import {Component, OnDestroy, OnInit} from '@angular/core';
import {getCurrentLobby, PokerState} from "../state/lobby.reducer";
import {PokerLobbyService} from "../shared/lobby.service";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, first, map, share, shareReplay, skipWhile, switchMap, takeUntil, tap} from "rxjs/operators";
import {combineLatest, EMPTY, interval, of, Subject} from "rxjs";
import * as LobbyActions from "../state/lobby.actions"
import {getUser} from "../../state/app.reducer";
import {PokerLobby} from "../shared/lobby.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "poker-lobby",
  template: `
    <main role="main" class="container" *ngIf="vm$ | async as vm">
      <h1>Lobby {{vm.lobby.name}}</h1>
      <div class="row">
        <div class="col-md-3" >
          <h3>Spieler</h3>
          <ul style="list-style: none; font-size: x-large;">
            <li *ngIf="vm.lobby.player1"><span title="Lobbyadmin">👑</span> {{vm.lobby.player1.name}}</li>
            <li *ngIf="vm.lobby.player2">👨 {{vm.lobby.player2.name}}</li>
            <li *ngIf="vm.lobby.player3">👨 {{vm.lobby.player3.name}}</li>
            <li *ngIf="vm.lobby.player4">👨 {{vm.lobby.player4.name}}</li>
            <li *ngIf="vm.lobby.player5">👨 {{vm.lobby.player5.name}}</li>
            <li *ngIf="vm.lobby.player6">👨 {{vm.lobby.player6.name}}</li>
            <li *ngIf="vm.lobby.player7">👨 {{vm.lobby.player7.name}}</li>
            <li *ngIf="vm.lobby.player8">👨 {{vm.lobby.player8.name}}</li>
          </ul>
        </div>
        <div class="col-md-9" *ngIf="!vm.isAdmin">
          <h3>Konfiguration</h3>
          <div class="row" style="font-size: x-large;">
            <table cellpadding="5">
              <tr><td>🃏 Spieltyp</td><td>{{vm.lobby.type.text}}</td><td>💰 Startgeld</td><td>{{vm.lobby.money}}</td></tr>
              <tr><td>💸 Blinds</td><td>{{vm.lobby.smallBlind}} / {{vm.lobby.bigBlind}}</td><td>😴 Max. Inaktivität</td><td>{{vm.lobby.idleTime}}</td></tr>
              <tr><td>🔂 Rundenerhöhung</td><td>{{vm.lobby.intervalRounds}}</td><td>⏰ Zeiterhöhung</td><td>{{vm.lobby.intervalTime}}</td></tr>
            </table>
          </div>
        </div>
        <div class="col-md-9" *ngIf="vm.isAdmin">
          <h3>Konfiguration</h3>
          <div class="row">
            <form [formGroup]="lobbyForm">
            <table cellpadding="5">
              <tr>
                <td colspan="2">
                  <label class="small-label" for="type">🃏 Spieltyp</label>
                  <ng-select labelForId="type"
                             [items]="types"
                             [multiple]="false"
                             [clearable]="false"
                             [closeOnSelect]="true"
                             bindLabel="text"
                             formControlName="type">
                  </ng-select>
                </td>
                <td>
                <poker-reactive-input-group [class]="'small-group'"
                                            [altLabel]="'💰 Startgeld'"
                                            [label]="'💰 Startgeld'"
                                            [title]="'💰 Startgeld'"
                                            [name]="'money'"
                                            [required]="true"
                                            [type]="'number'"
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
                                            [type]="'number'"
                                            formControlName="smallBlind"
                                            [control]="lobbyForm.controls.smallBlind"></poker-reactive-input-group>
                </td><td>
                <poker-reactive-input-group [class]="'small-group'"
                                            [altLabel]="'💸 Big Blind'"
                                            [label]="'💸 Big Blind'"
                                            [title]="'💸 Big Blind'"
                                            [name]="'bigBlind'"
                                            [required]="true"
                                            [type]="'number'"
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
                                            [type]="'number'"
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
                                            [type]="'number'"
                                            formControlName="intervalRounds"
                                            [control]="lobbyForm.controls.intervalRounds"></poker-reactive-input-group>
              </td><td>
                <poker-reactive-input-group [class]="'small-group'"
                                            [altLabel]="'⏰ Zeiterhöhung'"
                                            [label]="'⏰ Zeiterhöhung (Minuten)'"
                                            [title]="'Blinderhöhung alle __ Minuten (0 = keine Zeiterhöhung)'"
                                            [name]="'intervalTime'"
                                            [required]="true"
                                            [type]="'number'"
                                            formControlName="intervalTime"
                                            [control]="lobbyForm.controls.intervalTime"></poker-reactive-input-group>
              </td></tr>
            </table>
            </form>
          </div>
        </div>
        <button class="btn btn-outline-dark btn-sm" (click)="leaveLobby()">🚪 Lobby{{vm.isAdmin ? " löschen und " : " "}}verlassen</button>
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
export class PokerLobbyComponent implements OnInit, OnDestroy {

  public lobbyForm: FormGroup;
  public requestInProgress: boolean;
  private updateLoopRunning = false;

  public types = [
    {id: "FULL", text: "Spiel mit Karten und Chips"},
    {id: "CARDS", text: "Nur Karten"}
  ];

  onDestroy$ = new Subject();

  currentLobby$ = this.store.select(getCurrentLobby).pipe(
      skipWhile(lobby => lobby === null),
      tap((lobby) => console.log("loading current lobby from lobby detail", lobby)),
      tap(lobby => {
        // if (lobby === null) {this.router.navigate([""]);}
      }),
      map(lobby => {
        if (lobby) {
          return {
            ...lobby,
            type: this.types.find(t => t.id === lobby.type)
          }
        } return null;
      }),
      tap(lobby => this.lobbyForm.patchValue(lobby)),
      shareReplay(1)
  );
  currentUser$ = this.store.select(getUser);

  isLobbyAdmin$ = combineLatest([this.currentLobby$, this.currentUser$]).pipe(
      tap(() => console.log("checking for admin of group")),
      map(([lobby, user]) => lobby && lobby.creator.id === user.id)
  );

  vm$ = combineLatest([this.isLobbyAdmin$, this.currentUser$, this.currentLobby$]).pipe(
      map(([isAdmin, user, lobby]) => ({isAdmin, user, lobby}))
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
      type: new FormControl(this.types[0], [Validators.required, Validators.maxLength(45), Validators.minLength(5)]),
      money: new FormControl(5000, [Validators.required, Validators.min(100), Validators.max(10000000)]),
      smallBlind: new FormControl(5, [Validators.required, Validators.min(1), Validators.max(100000)]),
      bigBlind: new FormControl(10, [Validators.required, Validators.min(5), Validators.max(200000)]),
      idleTime: new FormControl(60, [Validators.required, Validators.min(15), Validators.max(600)]),
      intervalRounds: new FormControl(10, [Validators.required, Validators.min(0), Validators.max(100)]),
      intervalTime: new FormControl(10, [Validators.required, Validators.min(0), Validators.max(60)])
    });

    this.isLobbyAdmin$.pipe(
        takeUntil(this.onDestroy$)
    ).subscribe(isAdmin => {
      console.log("preparing refresh hooks");
      if (isAdmin) {
        combineLatest([this.lobbyForm.valueChanges, this.currentLobby$]).pipe(
            map(([form, lobby]) => ({
              ...form,
              id: lobby ? lobby.id: null,
              type: form.type.id
            })),
            tap(form => console.log("updated", form)),
            switchMap(form => this.lobbyService.updateLobby(form).pipe(
                tap(lobby => console.log("successfully updated lobby")),
                catchError(err => {
                  console.error("failed to update lobby", err);
                  return null;
                })
            )),
            takeUntil(this.onDestroy$)
        ).subscribe();
        // interval(5000).pipe(
        //   tap( () => this.store.dispatch(LobbyActions.updateLobbyUsers()))
        // ).subscribe();
      } else {
        if (!this.updateLoopRunning) {
          console.log("SETTING UP REFRESH INTERVAL");
          this.updateLoopRunning = true;
          interval(3000).pipe(
              tap(() => console.log("updating lobby")),
              tap(() => this.store.dispatch(LobbyActions.loadCurrentLobby())),
              takeUntil(this.onDestroy$)
          ).subscribe();
        }
      }
    });

    // const updateUsers = () => {
    //   setTimeout(() => {
    //     console.log("updating users in lobby...");
    //     this.lobbyService.getCurrentLobby.subscribe(
    //         lobby => {
    //           console.log("got updated lobby", lobby);
    //           this.store.dispatch(LobbyActions.updateLobbyUsers({lobby}));
    //
    //         }
    //     ).unsubscribe();
    //     updateUsers();
    //   }, 1000);
    // }
    //
    // updateUsers();
  }

  leaveLobby() {
    this.store.dispatch(LobbyActions.leavePokerLobby());
  }
}
