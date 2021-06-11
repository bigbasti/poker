import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PokerLobbyService} from "../shared/lobby.service";
import * as LobbyActions from "./lobby.actions"
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";
import {PokerLobby} from "../shared/lobby.model";

@Injectable()
export class LobbyEffects {
    constructor(
        private actions$: Actions,
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
}