import {PokerUser} from "../shared/model/user.model";

export interface PokerState {
    user: PokerUser,
    loginError: any
    loadUserError: any
}