import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import * as AppActions from "./app.actions";
import {PokerState} from "./app.state";

const initialState: PokerState = {
    user: null,
    loginError: null,
    loadUserError: null,
    registrationSuccessful: null,
    registrationFailure: null
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
export const getRegisterError = createSelector(
    getAppState,
    state => state.registrationFailure
)
export const getRegisterSuccess = createSelector(
    getAppState,
    state => state.registrationSuccessful
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
    }),
    on(AppActions.loadUserDetailsFailure, (state, action) => {
        return {
            ...state,
            user: null,
            loginError: null,
            loadUserError: action.error
        }
    }),
    on(AppActions.registerUserSuccess, (state, action) => {
        return {
            ...state,
            registrationSuccessful: true,
            registrationFailure: null
        }
    }),
    on(AppActions.registerUserFailure, (state, action) => {
        return {
            ...state,
            registrationSuccessful: false,
            registrationFailure: action.error
        }
    })
);