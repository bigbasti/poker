import {PokerUser} from "../shared/model/user.model";
import {PokerLobby} from "../lobby/shared/lobby.model";

export interface PokerState {
    user: PokerUser,
    loginError: any
    loadUserError: any
}