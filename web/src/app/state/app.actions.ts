import {createAction, props} from "@ngrx/store";
import {Credentials, PokerUser, RegisterModel} from "../shared/model/user.model";

export const loginUser = createAction("[app] login user", props<{credentials: Credentials}>());
export const loginUserSuccess = createAction("[app] login user success");
export const loginUserFailure = createAction("[app] login user failure", props<{error: any}>());

export const registerUser = createAction("[app] register user", props<{model: RegisterModel}>());
export const registerUserSuccess = createAction("[app] register user success", props<{user: PokerUser}>());
export const registerUserFailure = createAction("[app] register user failure", props<{error: any}>());

export const loadUserDetails = createAction("[app] load user");
export const loadUserDetailsSuccess = createAction("[app] load user success", props<{user: PokerUser}>());
export const loadUserDetailsFailure = createAction("[app] load user failure", props<{error: any}>());

export const createUserInstance = createAction("[app] create user instance", props<{response: any}>());

