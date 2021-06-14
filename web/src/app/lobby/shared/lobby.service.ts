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
    getCurrentLobby = this.http.get<PokerLobby>(`${this.env.getApiEndpointRoot()}/lobby/current`, {withCredentials: true});
    leaveCurrentLobby = this.http.post<any>(`${this.env.getApiEndpointRoot()}/lobby/leave`, null, {withCredentials: true});
    createLobby = (name: string) => this.http.post<PokerLobby>(`${this.env.getApiEndpointRoot()}/lobby`, name, {withCredentials: true});
    updateLobby = (lobby: PokerLobby) => this.http.post<PokerLobby>(`${this.env.getApiEndpointRoot()}/lobby/${lobby.id}`, lobby, {withCredentials: true});
}