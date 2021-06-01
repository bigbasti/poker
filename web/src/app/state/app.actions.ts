import {createAction, props} from "@ngrx/store";
import {Credentials, PokerUser} from "../shared/model/user.model";

export const loginUser = createAction("[app] login user", props<{credentials: Credentials}>());
export const loginUserSuccess = createAction("[app] login user success");
export const loginUserFailure = createAction("[app] login user failure", props<{error: any}>());

export const loadUserDetails = createAction("[app] load user");
export const loadUserDetailsSuccess = createAction("[app] load user success", props<{user: PokerUser}>());
export const loadUserDetailsFailure = createAction("[app] load user failure", props<{error: any}>());

export const createUserInstance = createAction("[app] create user instance", props<{response: any}>());

