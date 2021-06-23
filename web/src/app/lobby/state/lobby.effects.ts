import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PokerLobbyService} from "../shared/lobby.service";
import * as LobbyActions from "./lobby.actions"
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {PokerGameService} from "../../game/shared/game.service";

@Injectable()
export class LobbyEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private lobbyService: PokerLobbyService,
        private gameService: PokerGameService
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

    startGame$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LobbyActions.startGame),
            mergeMap((action) => this.gameService.startGame$(action.lobby).pipe(
                map(game => LobbyActions.startGameSuccess({game})),
                // catchError(error => of(LobbyActions.leavePokerLobbyFailure({error})))
            ))
        )
    });

    startGameSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LobbyActions.startGameSuccess),
            tap(() => this.router.navigate(["game"]))
        ), {dispatch: false});
}