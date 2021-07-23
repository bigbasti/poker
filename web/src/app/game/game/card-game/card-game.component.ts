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
            <div class="row">
                <div class="col justify-content-center" [class.card-container]="vm.openCards.length > 1">
                    <div style="margin-left: 25%;" *ngIf="vm.openCards.length > 0" class="p-card {{vm.openCards[0].suite.toLowerCase()}}-{{vm.openCards[0].value}}"></div>
                </div>
                <div class="col justify-content-center" [class.card-container]="vm.openCards.length > 1">
                    <div style="margin-left: 25%;" *ngIf="vm.openCards.length > 1" class="p-card {{vm.openCards[1].suite.toLowerCase()}}-{{vm.openCards[1].value}}"></div>
                </div>
                <div class="col justify-content-center" [class.card-container]="vm.openCards.length > 1">
                    <div style="margin-left: 25%;" *ngIf="vm.openCards.length > 2" class="p-card {{vm.openCards[2].suite.toLowerCase()}}-{{vm.openCards[2].value}}"></div>
                </div>
                <div class="col justify-content-center" [class.card-container]="vm.openCards.length > 1">
                    <div style="margin-left: 25%;" *ngIf="vm.openCards.length > 3" class="p-card {{vm.openCards[3].suite.toLowerCase()}}-{{vm.openCards[3].value}}"></div>
                </div>
                <div class="col justify-content-center" [class.card-container]="vm.openCards.length > 1">
                    <div style="margin-left: 25%;" *ngIf="vm.openCards.length > 4" class="p-card {{vm.openCards[4].suite.toLowerCase()}}-{{vm.openCards[4].value}}"></div>
                </div>
                <div class="col justify-content-center">
                    <ng-container>
                        <button *ngIf="(!vm.round || vm.round.finished) && vm.userIsHost" class="btn btn-primary" (click)="startNextRound()">Runde {{vm.game.gameRounds + 1}} Starten</button>
                        <button *ngIf="vm.round && vm.round.currentTurn < 4 && vm.userIsHost" class="btn btn-primary" (click)="showNextCards()">Nächste Karten aufdecken</button>
                        <button *ngIf="vm.round && vm.round.currentTurn === 4 && vm.userIsHost" class="btn btn-primary" (click)="showNextCards()">Aufdecken und Gewinner bestimmen</button>
                    </ng-container>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col" *ngFor="let p of vm.game.players">
                    <div class="row justify-content-center">
                        <div *ngIf="p.card1 && parseCards(p.card1)[0] as card1" class="p-card {{card1.suite.toLowerCase()}}-{{card1.value}}"></div>
                        <div *ngIf="p.card2 && parseCards(p.card2)[0] as card2" class="p-card {{card2.suite.toLowerCase()}}-{{card2.value}}"></div>
                        <div *ngIf="!p.card1" class="p-card back"></div>
                        <div *ngIf="!p.card2" class="p-card back"></div>
                    </div>
                    <div class="row">
                        <div class="col text-center" style="color: white;">
                            <strong>{{p.user.name}}</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-5 pt-2 pb-2 ml-1 mr-1 rounded" style="background-color: white;">
                <div class="col">
                    <button id="leave-game" class="btn btn-outline-danger" (click)="leaveGame()">Spiel verlassen</button>
                </div>
            </div>
        </ng-container>
    `,
    styles: [`
        .card-container {
            border: 10px solid white;
            padding: 5px;
            margin: 5px;
            border-radius: 10px;
        }
    `]
})
export class CardGameComponent implements OnInit, OnDestroy {
    onDestroy$ = new Subject();

    currentUser$ = this.store.select(getUser);
    currentGame$ = this.store.select(getCurrentGame);
    userIsHost$ = combineLatest([this.currentUser$, this.currentGame$]).pipe(
        map(([user, game]) => game.creator.id === user.id)
    );

    currentRound$ = this.currentGame$.pipe(
        takeWhile(game => game !== null),
        map(game => {
            const openRound = game.rounds.find(r => r.finished === false);
            if (!openRound) {
                if (game.rounds) {
                    return [...game.rounds].sort((a, b) => b.number - a.number)[0];
                }
            }
            return openRound;
        }),
        tap(round => console.log("current round", round))
    );

    openCards$ = this.currentRound$.pipe(
        map(round => round ? this.parseCards(round.openCards) : [])
    );

    vm$ = combineLatest([this.currentGame$, this.currentUser$, this.currentRound$, this.userIsHost$, this.openCards$]).pipe(
        map(([game, user, round, userIsHost, openCards]) => ({game, user, round, userIsHost, openCards}))
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

    showNextCards() {
        this.store.dispatch(GameActions.showNextCards());
    }

    parseCards(cards: string): {suite: string, value: number}[] {
        if (!cards) { return [];}
        return cards.split(",").map(card => {
            let cParts = card.split("-");
            return {suite: cParts[0], value: Number(cParts[2])}
        });
    }

    leaveGame() {
        this.store.dispatch(GameActions.leaveGame());
    }
}
