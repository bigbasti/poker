import {createAction, createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {PokerLobby} from "../shared/lobby.model";
import * as AppState from "../../state/app.state"
import * as LobbyActions from "./lobby.actions";

export interface PokerState extends AppState.PokerState {
    lobby: LobbyState
}

export interface LobbyState {
    availableLobbies: PokerLobby[],
    availableLobbiesLoadingError: string,
    currentLobby: PokerLobby
}

const initialState: LobbyState = {
    availableLobbies: [],
    availableLobbiesLoadingError: null,
    currentLobby: null
}

const getLobbyState = createFeatureSelector<LobbyState>("lobby");


export const getAvailableLobbies = createSelector(
    getLobbyState,
    state => state.availableLobbies
)
export const getAvailableLobbiesError = createSelector(
    getLobbyState,
    state => state.availableLobbiesLoadingError
)
export const getCurrentLobby = createSelector(
    getLobbyState,
    state => state.currentLobby
)
export const getCurrentLobbyUsers = createSelector(
    getLobbyState,
    state => [state.currentLobby.player1, state.currentLobby.player2, state.currentLobby.player3, state.currentLobby.player4,state.currentLobby.player5 ,state.currentLobby.player6 ,state.currentLobby.player7, state.currentLobby.player8]
)

export const lobbyReducer = createReducer<LobbyState>(
    initialState,
    on(LobbyActions.loadAvailableLobbiesSuccess, (state, action) => {
        return {
            ...state,
            availableLobbies: action.lobbies,
            availableLobbiesLoadingError: null
        }
    }),
    on(LobbyActions.loadAvailableLobbiesFailure, (state, action) => {
        return {
            ...state,
            availableLobbies: [],
            availableLobbiesLoadingError: action.error
        }
    }),
    on(LobbyActions.joinPokerLobbySuccess, (state, action) => {
        return {
            ...state,
            currentLobby: action.lobby
        }
    }),
    on(LobbyActions.leavePokerLobbySuccess, (state, action) => {
        return {
            ...state,
            currentLobby: null
        }
    }),
    on(LobbyActions.updateLobbyConfigSuccess, (state, action) => {
        return {
            ...state,
            currentLobby: action.lobby
        }
    }),
    on(LobbyActions.updateLobbyUsers, (state, action) => {
        return {
            ...state,
            currentLobby: {
                ...state.currentLobby,
                player1: action.lobby.player1,
                player2: action.lobby.player2,
                player3: action.lobby.player3,
                player4: action.lobby.player4,
                player5: action.lobby.player5,
                player6: action.lobby.player6,
                player7: action.lobby.player7,
                player8: action.lobby.player8
            }
        }
    })
);