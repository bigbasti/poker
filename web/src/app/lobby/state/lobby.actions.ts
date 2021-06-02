import {createAction, props} from "@ngrx/store";
import {PokerLobby} from "../shared/lobby.model";


export const loadAvailableLobbies = createAction("[Lobby] load available Lobbies");
export const loadAvailableLobbiesSuccess = createAction("[lobby] load available lobbies success", props<{lobbies: PokerLobby[]}>());
export const loadAvailableLobbiesFailure = createAction("[lobby] load available lobbies failed", props<{error: any}>());

export const joinPokerLobby = createAction("[lobby] join lobby", props<{lobby: PokerLobby}>());
export const joinPokerLobbySuccess = createAction("[lobby] join lobby success", props<{lobby: PokerLobby}>());
export const joinPokerLobbyFailure = createAction("[lobby] join lobby failure", props<{error: any}>());