import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {PokerGameService} from "../shared/game.service";
import * as GameActions from "../../game/state/game.actions";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";

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
}