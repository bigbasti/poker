import {createAction, props} from "@ngrx/store";
import {PokerLobby} from "../shared/lobby.model";


export const loadAvailableLobbies = createAction("[Lobby] load available Lobbies");
export const loadAvailableLobbiesSuccess = createAction("[lobby] load available lobbies success", props<{lobbies: PokerLobby[]}>());
export const loadAvailableLobbiesFailure = createAction("[lobby] load available lobbies failed", props<{error: any}>());

export const loadCurrentLobby = createAction("[Lobby] load current lobby");
export const updateLobbyUsers = createAction("[Lobby] update users", props<{lobby: PokerLobby}>());

export const joinPokerLobby = createAction("[lobby] join lobby", props<{lobby: PokerLobby}>());
export const joinPokerLobbySuccess = createAction("[lobby] join lobby success", props<{lobby: PokerLobby}>());
export const joinPokerLobbyFailure = createAction("[lobby] join lobby failure", props<{error: any}>());

export const createPokerLobby = createAction("[lobby] create lobby", props<{name: string}>());

export const leavePokerLobby = createAction("[lobby] leave lobby");
export const leavePokerLobbySuccess = createAction("[lobby] leave lobby success");
export const leavePokerLobbyFailure = createAction("[lobby] leave lobby success", props<{error: any}>());