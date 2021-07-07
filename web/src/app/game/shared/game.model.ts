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
    rounds: PokerRound[];
}

export interface PokerPlayer {
    id: number;
    money: number;
    card1: string;
    card2: string;
    user: PokerUser;
}

export interface PokerRound {
    id: number;
    number: number;
    deck: string;
    openCards: string;
    pots: string;
    removedCards: string;
    p1Cards: string;
    p2Cards: string;
    p3Cards: string;
    p4Cards: string;
    p5Cards: string;
    p6Cards: string;
    p7Cards: string;
    p8Cards: string;
    currentTurn: number;
    finished: boolean;
    bigBlind: number;
    smallBlind: number;
    dealer: PokerPlayer;
    turns: PokerTurn[];
}

export interface PokerTurn {
    id: number;
    type: string;
    finished: boolean;
    p1Bet: string;
    p2Bet: string;
    p3Bet: string;
    p4Bet: string;
    p5Bet: string;
    p6Bet: string;
    p7Bet: string;
    p8Bet: string;
    playerTurn: PokerPlayer;
}