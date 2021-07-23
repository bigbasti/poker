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
    <main *ngIf="vm$ | async as vm" class="container poker-matt rounded mt-5" role="main">
      <div *ngIf="vm.game && vm.game.type === 'CARDS'" class="pt-3 pb-3">
        <poker-card-game></poker-card-game>
      </div>
      <div *ngIf="vm.game && vm.game.type === 'FULL'" class="pt-3 pb-3">
        <div class="alert alert-warning">Modus noch nicht verfügbar</div>
      </div>
    </main>
  `,
  styles: [`
        .poker-matt {
          background-image: url("../../../assets/images/matt_bg.jpg");
          background-repeat: repeat;
        }
    `]
})
export class PokerGameComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject();

  currentUser$ = this.store.select(getUser);
  currentGame$ = this.store.select(getCurrentGame);

  vm$ = combineLatest([this.currentGame$, this.currentUser$]).pipe(
    map(([game, user]) => ({game, user}))
  );

  constructor(
      private gameService: PokerGameService,
      private store: Store<PokerState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(GameActions.loadCurrentGame());
  }

  ngOnDestroy(): void {
  }

}
