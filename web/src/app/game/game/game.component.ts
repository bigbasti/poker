import { Component, OnInit } from '@angular/core';
import {PokerGameService} from "../shared/game.service";
import {Store} from "@ngrx/store";
import {PokerState} from "../../lobby/state/lobby.reducer";
import {Router} from "@angular/router";
import * as GameActions from "../state/game.actions";
import {getUser} from "../../state/app.reducer";
import {getCurrentGame} from "../state/game.reducer";
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";

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
export class PokerGameComponent implements OnInit {

  currentUser$ = this.store.select(getUser);
  currentGame$ = this.store.select(getCurrentGame);

  vm$ = combineLatest([this.currentGame$, this.currentUser$]).pipe(
    map(([game, user]) => ({game, user}))
  );

  constructor(
      private gameService: PokerGameService,
      private store: Store<PokerState>,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(GameActions.loadCurrentGame());
  }

}
