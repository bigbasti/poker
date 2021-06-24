import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PokerEnvironmentService} from "../../shared/services/environmant.service";
import {PokerGame} from "./game.model";

@Injectable()
export class PokerGameService {

    constructor(
        private http: HttpClient,
        private env: PokerEnvironmentService
    ) {
    }

    startGame$ = this.http.get<PokerGame>(`${this.env.getApiEndpointRoot()}/game/start`, {withCredentials: true});
    getCurrentGame$ = this.http.get<PokerGame>(`${this.env.getApiEndpointRoot()}/game`, {withCredentials: true});
}