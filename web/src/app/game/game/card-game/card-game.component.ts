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
                <div class="col">
                    <div *ngIf="vm.openCards.length > 0" class="p-card {{vm.openCards[0].suite.toLowerCase()}}-{{vm.openCards[0].value}}"></div>
                </div>
                <div class="col">
                    <div *ngIf="vm.openCards.length > 1" class="p-card {{vm.openCards[1].suite.toLowerCase()}}-{{vm.openCards[1].value}}"></div>
                </div>
                <div class="col">
                    <div *ngIf="vm.openCards.length > 2" class="p-card {{vm.openCards[2].suite.toLowerCase()}}-{{vm.openCards[2].value}}"></div>
                </div>
                <div class="col">
                    <div *ngIf="vm.openCards.length > 3" class="p-card {{vm.openCards[3].suite.toLowerCase()}}-{{vm.openCards[3].value}}"></div>
                </div>
                <div class="col">
                    <div *ngIf="vm.openCards.length > 4" class="p-card {{vm.openCards[4].suite.toLowerCase()}}-{{vm.openCards[4].value}}"></div>
                </div>
                <div class="col">
                    <div class="p-card back"></div>
                </div>
                <div class="col">
                    <div class="p-card back"></div>
                </div>
                <div class="col">
                    <ng-container>
                        <button *ngIf="!vm.round && vm.userIsHost" class="btn btn-primary" (click)="startNextRound()">Runde {{vm.game.gameRounds + 1}} Starten</button>
                        <button *ngIf="vm.round && vm.round.currentTurn <= 4 && vm.userIsHost" class="btn btn-primary" (click)="showNextCards()">Nächste Karten aufdecken</button>
                        <button *ngIf="vm.round && vm.round.currentTurn === 5 && vm.userIsHost" class="btn btn-primary" (click)="showNextCards()">Aufdecken und Gewinner bestimmen</button>
                    </ng-container>
                </div>
            </div>
            <div class="row">
                <div class="col" *ngFor="let p of vm.game.players">
                    <div class="row" let>
                        {{p.user.name}}<br/>
                        <div *ngIf="p.card1 && parseCards(p.card1)[0] as card1" class="p-card {{card1.suite.toLowerCase()}}-{{card1.value}}"></div>
                        <div *ngIf="p.card2 && parseCards(p.card2)[0] as card2" class="p-card {{card2.suite.toLowerCase()}}-{{card2.value}}"></div>
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
    userIsHost$ = combineLatest([this.currentUser$, this.currentGame$]).pipe(
        map(([user, game]) => game.creator.id === user.id)
    );

    currentRound$ = this.currentGame$.pipe(
        takeWhile(game => game !== null),
        map(game => game.rounds.find(r => r.finished === false))
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
}
