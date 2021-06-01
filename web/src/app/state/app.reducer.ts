import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import * as AppActions from "./app.actions";
import {PokerState} from "./app.state";

const initialState: PokerState = {
    user: null,
    loginError: null,
    loadUserError: null
}

const getAppState = createFeatureSelector<PokerState>("app");


export const getUser = createSelector(
    getAppState,
    state => state.user
)
export const getLoginError = createSelector(
    getAppState,
    state => state.loginError
)
export const getUserDetailsError = createSelector(
    getAppState,
    state => state.loadUserError
)

export const appReducer = createReducer<PokerState>(
    initialState,
    on(AppActions.loadUserDetailsSuccess, (state, action) => {
        return {
            ...state,
            user: action.user,
            loginError: null,
            loadUserError: null
        }
    }),
    on(AppActions.loginUserFailure, (state, action) => {
        return {
            ...state,
            user: null,
            loginError: action.error,
            loadUserError: null
        }
    }),
    on(AppActions.loadUserDetailsFailure, (state, action) => {
        return {
            ...state,
            user: null,
            loginError: null,
            loadUserError: action.error
        }
    })
);