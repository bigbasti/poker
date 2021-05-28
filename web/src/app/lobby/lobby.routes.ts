import {Routes} from "@angular/router";
import {PokerLobbyOverviewComponent} from "./lobby-overview/lobby-overview.component";

export const lobbyRoutes: Routes = [
    {path: "lobbies", component: PokerLobbyOverviewComponent}
];