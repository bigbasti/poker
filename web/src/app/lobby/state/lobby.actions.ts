import {createAction, props} from "@ngrx/store";
import {PokerLobby} from "../shared/lobby.model";


export const loadAvailableLobbies = createAction("[Lobby] load available Lobbies");
export const loadAvailableLobbiesSuccess = createAction("[lobby] load available lobbies success", props<{lobbies: PokerLobby[]}>());
export const loadAvailableLobbiesFailure = createAction("[lobby] load available lobbies failed", props<{error: string}>());