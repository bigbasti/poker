import {createAction, props} from "@ngrx/store";
import {PokerGame} from "../shared/game.model";

export const loadCurrentGame = createAction("[Game] load current game");
export const loadCurrentGameSuccess = createAction("[Game] load current game success", props<{game: PokerGame}>());
export const loadCurrentGameFailure = createAction("[Game] load current game failed", props<{error: any}>());

export const startNextRound = createAction("[Game] start next round");
export const startNextRoundSuccess = createAction("[Game] start next round success");
export const startNextRoundFailure = createAction("[Game] start next round failed", props<{error: any}>());