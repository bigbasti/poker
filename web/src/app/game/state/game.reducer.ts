import * as AppState from "../../state/app.state";
import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import * as GameActions from "../state/game.actions";
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