import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {PokerGameService} from "../shared/game.service";
import * as GameActions from "../../game/state/game.actions";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import * as LobbyActions from "../../lobby/state/lobby.actions";

@Injectable()
export class GameEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private gameService: PokerGameService
    ) {
    }

    loadCurrentGame$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(GameActions.loadCurrentGame),
            mergeMap((action) => this.gameService.getCurrentGame$.pipe(
                map(game => GameActions.loadCurrentGameSuccess({game})),
                catchError(error => of(GameActions.loadCurrentGameFailure({error})))
            ))
        )
    });


    startNextRound$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(GameActions.startNextRound),
            mergeMap((action) => this.gameService.startNextRound$.pipe(
                map(res => GameActions.startNextRoundSuccess()),
                catchError(error => of(GameActions.startNextRoundFailure({error})))
            ))
        )
    });

    showNextCards$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(GameActions.showNextCards),
            mergeMap((action) => this.gameService.showNextCards$.pipe(
                map(res => GameActions.showNextCardsSuccess()),
                catchError(error => of(GameActions.showNextCardsFailure({error})))
            ))
        )
    });

    leaveGame$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(GameActions.leaveGame),
            mergeMap((action) => this.gameService.leaveGame$.pipe(
                map(game => GameActions.leaveGameSuccess({game})),
                catchError(error => of(GameActions.leaveGameFailure({error})))
            ))
        )
    });

    leaveGameSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GameActions.leaveGameSuccess),
            tap(() => this.router.navigate([""]))
        ), {dispatch: false});


}