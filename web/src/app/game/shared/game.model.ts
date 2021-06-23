import {PokerUser} from "../../shared/model/user.model";

export interface PokerGame {
    id: number;
    name: String;
    type: string;
    created: Date;
    finished: Date;
    smallBlind: number;
    bigBlind: number;
    intervallTime: number;
    intervallRounds: number;
    startingMoney: number;
    idleTime: number;
    gameTime: number;
    gameRounds: number;
    creator: PokerUser;
    winner: PokerPlayer;
    players: PokerPlayer[];
}

export interface PokerPlayer {
    id: number;
    money: number;
    card1: string;
    card2: string;
    user: number;
}