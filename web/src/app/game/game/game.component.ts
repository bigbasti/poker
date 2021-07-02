import {Component, OnDestroy, OnInit} from '@angular/core';
import {PokerGameService} from "../shared/game.service";
import {Store} from "@ngrx/store";
import {PokerState} from "../../lobby/state/lobby.reducer";
import {Router} from "@angular/router";
import * as GameActions from "../state/game.actions";
import {getUser} from "../../state/app.reducer";
import {getCurrentGame} from "../state/game.reducer";
import {combineLatest, interval, Subject} from "rxjs";
import {map, takeUntil, takeWhile, tap} from "rxjs/operators";

@Component({
  selector: 'poker-game',
  template: `
    <main *ngIf="vm$ | async as vm" class="container" role="main">
      <div *ngIf="vm.game.type === 'CARDS'">
        <div class="row">
          <div class="col"></div>
          <div class="col"></div>
          <div class="col"></div>
          <div class="col"></div>
          <div class="col"></div>
          <div class="col"></div>
          <div class="col"></div>
          <div class="col">
            <ng-container *ngIf="!vm.round">
              <button class="btn btn-primary" (click)="startNextRound()">Runde {{vm.game.gameRounds + 1}} Starten</button>
            </ng-container>
          </div>
        </div>
        <div class="row">
          <div class="col" *ngFor="let p of vm.game.players">
            <div class="row">
              {{p.user.name}}<br />
              {{p.money}}
            </div>
            <div class="row">
              
            </div>
          </div>
        </div>
      </div>
      <div *ngIf="vm.game.type === 'FULL'">
        <div class="alert alert-warning">Modus noch nicht verfügbar</div>
      </div>
    </main>
  `,
  styles: [
  ]
})
export class PokerGameComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject();

  currentUser$ = this.store.select(getUser);
  currentGame$ = this.store.select(getCurrentGame);

  currentRound$ = this.currentGame$.pipe(
      takeWhile(game => game !== null),
      map(game => game.rounds.find(r => r.finished === false))
  );

  vm$ = combineLatest([this.currentGame$, this.currentUser$, this.currentRound$]).pipe(
    map(([game, user, round]) => ({game, user, round}))
  );

  constructor(
      private gameService: PokerGameService,
      private store: Store<PokerState>,
      private router: Router
  ) { }

  ngOnInit(): void {
    interval(5000).pipe(
        tap(() => console.log("updating game state")),
        tap(() => this.store.dispatch(GameActions.loadCurrentGame())),
        takeUntil(this.onDestroy$)
    ).subscribe();
    this.store.dispatch(GameActions.loadCurrentGame());
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
  }

  startNextRound() {
    this.store.dispatch(GameActions.startNextRound());
  }
}
