import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PokerLobbyService} from "../shared/lobby.service";
import * as LobbyActions from "./lobby.actions"
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {PokerLobby} from "../shared/lobby.model";
import {Router} from "@angular/router";
import {updateLobbyConfig} from "./lobby.actions";

@Injectable()
export class LobbyEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private lobbyService: PokerLobbyService
    ) {
    }

    loadAvailableLobbies$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LobbyActions.loadAvailableLobbies),
            mergeMap(() => this.lobbyService.getAllLobbies$.pipe(
                map(lobbies => LobbyActions.loadAvailableLobbiesSuccess({lobbies})),
                catchError(error => of(LobbyActions.loadAvailableLobbiesFailure({error})))
            ))
        )
    });

    joinLobby$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LobbyActions.joinPokerLobby),
            mergeMap((action) => this.lobbyService.joinPokerLobby(action.lobby).pipe(
                map(lobby => LobbyActions.joinPokerLobbySuccess({lobby})),
                catchError(error => of(LobbyActions.joinPokerLobbyFailure({error})))
            ))
        )
    });

    loadCurrentLobby$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LobbyActions.loadCurrentLobby),
            mergeMap((action) => this.lobbyService.getCurrentLobby.pipe(
                map(lobby => LobbyActions.joinPokerLobbySuccess({lobby})),
                catchError(error => of(LobbyActions.joinPokerLobbyFailure({error})))
            ))
        )
    });

    loadCurrentLobbyFailureRedirect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LobbyActions.joinPokerLobbyFailure),
            tap((action) => console.log("cold not load current lobby:", action.error)),
            tap(() => this.router.navigate([""]))
        ), {dispatch: false});

    joinLobbySuccessRedirect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LobbyActions.joinPokerLobbySuccess),
            tap(() => this.router.navigate(["lobby"]))
        ), {dispatch: false});

    leaveCurrentLobby$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LobbyActions.leavePokerLobby),
            mergeMap((action) => this.lobbyService.leaveCurrentLobby.pipe(
                map(lobby => LobbyActions.leavePokerLobbySuccess()),
                catchError(error => of(LobbyActions.leavePokerLobbyFailure({error})))
            ))
        )
    });

    updateLobbyConfig$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LobbyActions.updateLobbyConfig),
            tap(action => console.log("updateLobbyCOnfig with action", action)),
            mergeMap((action) => this.lobbyService.updateLobby(action.form).pipe(
                map(lobby => LobbyActions.updateLobbyConfigSuccess({lobby})),
                // catchError(error => of(LobbyActions.leavePokerLobbyFailure({error})))
            ))
        )
    });

    leaveLobbySuccessRedirect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LobbyActions.leavePokerLobbySuccess),
            tap(() => this.router.navigate([""]))
        ), {dispatch: false});
}