import {Routes} from "@angular/router";
import {PokerLobbyComponent} from "./lobby/lobby.component";
import {PokerLobbyCreateComponent} from "./lobby-create/lobby-create.component";

export const lobbyRoutes: Routes = [
    {path: "lobby", component: PokerLobbyComponent},
    {path: "lobby/create", component: PokerLobbyCreateComponent}
];