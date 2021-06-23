import * as AppState from "../../state/app.state";
import {LobbyState} from "../../lobby/state/lobby.reducer";
import {createReducer, on} from "@ngrx/store";
import * as LobbyActions from "../../lobby/state/lobby.actions";

export interface PokerState extends AppState.PokerState {
    game: GameState
}

export interface GameState {

}

const initialState: GameState = {
}

export const gameReducer = createReducer<GameState>(
    initialState,
    on(LobbyActions.loadAvailableLobbiesSuccess, (state, action) => {
        return {
            ...state,
            availableLobbies: action.lobbies,
            availableLobbiesLoadingError: null
        }
    })
);