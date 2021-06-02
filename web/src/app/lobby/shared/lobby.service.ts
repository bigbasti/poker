import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PokerEnvironmentService} from "../../shared/services/environmant.service";
import {PokerLobby} from "./lobby.model";

@Injectable()
export class PokerLobbyService {

    constructor(
        private http: HttpClient,
        private env: PokerEnvironmentService
    ) {
    }

    getAllLobbies$ = this.http.get<PokerLobby[]>(`${this.env.getApiEndpointRoot()}/lobby`, {withCredentials: true});
    joinPokerLobby = (lobby: PokerLobby) => this.http.get<PokerLobby>(`${this.env.getApiEndpointRoot()}/lobby/${lobby.id}/join`, {withCredentials: true});
}