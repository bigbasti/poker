import {createAction, createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {PokerLobby} from "../shared/lobby.model";
import * as AppState from "../../state/app.state"
import * as LobbyActions from "./lobby.actions";

export interface PokerState extends AppState.PokerState {
    lobby: LobbyState
}

export interface LobbyState {
    availableLobbies: PokerLobby[],
    availableLobbiesLoadingError: string
}

const initialState = {
    availableLobbies: [],
    availableLobbiesLoadingError: null
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

export const lobbyReducer = createReducer<LobbyState>(
    initialState,
    on(LobbyActions.loadAvailableLobbies, (state): LobbyState => {
        return {
            ...state
        }
    }),
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
    })
);