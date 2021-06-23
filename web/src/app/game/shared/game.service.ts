import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PokerEnvironmentService} from "../../shared/services/environmant.service";
import {PokerLobby} from "../../lobby/shared/lobby.model";
import {PokerGame} from "./game.model";

@Injectable()
export class PokerGameService {

    constructor(
        private http: HttpClient,
        private env: PokerEnvironmentService
    ) {
    }

    startGame$ = (lobby: PokerLobby) => this.http.post<PokerGame>(`${this.env.getApiEndpointRoot()}/game/start`, lobby, {withCredentials: true});
}