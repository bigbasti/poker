import * as AppState from "../../state/app.state";
import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import * as LobbyActions from "../../lobby/state/lobby.actions";
import * as GameActions from "../state/game.actions";
import {PokerGame} from "../shared/game.model";
import {LobbyState} from "../../lobby/state/lobby.reducer";

export interface PokerState extends AppState.PokerState {
    game: GameState
}

export interface GameState {
    game: PokerGame
}

const initialState: GameState = {
    game: null
}

const getGameState = createFeatureSelector<GameState>("game");

export const getCurrentGame = createSelector(
    getGameState,
    state => state.game
)

export const gameReducer = createReducer<GameState>(
    initialState,
    on(GameActions.loadCurrentGameSuccess, (state, action) => {
        return {
            ...state,
            game: action.game,
        }
    })
);