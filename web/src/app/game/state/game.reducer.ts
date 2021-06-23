import * as AppState from "../../state/app.state";
import {createReducer, on} from "@ngrx/store";
import * as LobbyActions from "../../lobby/state/lobby.actions";
import {PokerGame} from "../shared/game.model";

export interface PokerState extends AppState.PokerState {
    game: GameState
}

export interface GameState {
    game: PokerGame
}

const initialState: GameState = {
    game: null
}

export const gameReducer = createReducer<GameState>(
    initialState,
    on(LobbyActions.startGameSuccess, (state, action) => {
        return {
            ...state,
            game: action.game,
        }
    })
);