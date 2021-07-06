import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, interval, Subject} from "rxjs";
import {getUser} from "../../../state/app.reducer";
import {getCurrentGame} from "../../state/game.reducer";
import {map, takeUntil, takeWhile, tap} from "rxjs/operators";
import {PokerGameService} from "../../shared/game.service";
import {Store} from "@ngrx/store";
import {PokerState} from "../../../lobby/state/lobby.reducer";
import {Router} from "@angular/router";
import * as GameActions from "../../state/game.actions";

@Component({
    selector: 'poker-card-game',
    template: `
        <ng-container *ngIf="vm$ | async as vm">
            <div class="col p-card clubs-a"></div>
            <div class="col p-card hearts-2"></div>
            <div class="col p-card diamonds-k"></div>
            <div class="col p-card spades-j"></div>
            <div class="col p-card back"></div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col">
                <ng-container *ngIf="!vm.round">
                    <button class="btn btn-primary" (click)="startNextRound()">Runde {{vm.game.gameRounds + 1}}
                        Starten
                    </button>
                </ng-container>
            </div>
            <div class="row">
                <div class="col" *ngFor="let p of vm.game.players">
                    <div class="row">
                        {{p.user.name}}<br/>
                        {{p.money}}
                    </div>
                    <div class="row">

                    </div>
                </div>
            </div>
        </ng-container>
    `,
    styles: []
})
export class CardGameComponent implements OnInit, OnDestroy {
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
    ) {
    }

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
