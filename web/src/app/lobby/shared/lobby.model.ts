import {PokerUser} from "../../shared/model/user.model";

export interface PokerLobby {
    id: number;
    name: string;
    money: number;
    type: string;
    smallBlind: number;
    bigBlind: number;
    intervalRounds: number;
    intervalTime: number;
    idleTime: number;
    creator: PokerUser;
    player1: PokerUser;
    player2: PokerUser;
    player3: PokerUser;
    player4: PokerUser;
    player5: PokerUser;
    player6: PokerUser;
    player7: PokerUser;
    player8: PokerUser;
}