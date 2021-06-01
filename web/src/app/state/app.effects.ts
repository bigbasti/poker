import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as AppActions from "./app.actions";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {PokerAuthService} from "../shared/services/auth.service";
import {PokerUser} from "../shared/model/user.model";

@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private authService: PokerAuthService
    ) {
    }

    checkCredentials$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AppActions.loginUser),
            mergeMap((action) => this.authService.login(action.credentials).pipe(
                map(lobbies => AppActions.loadUserDetails()),
                catchError(error => of(AppActions.loginUserFailure({error})))
            ))
        )
    });

    loadUserDetails$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AppActions.loadUserDetails),
            mergeMap((action) => this.authService.checkAuthenticationStatus().pipe(
                map(user => AppActions.createUserInstance({response: user})),
                catchError(error => of(AppActions.loadUserDetailsFailure({error})))
            ))
        )
    });

    createUserInstance$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AppActions.createUserInstance),
            mergeMap((action) => this.authService.createUserInstance(action.response).pipe(
                map(user => AppActions.loadUserDetailsSuccess({user: user as PokerUser}))
            ))
        )
    });
}