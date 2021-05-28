import {Routes} from "@angular/router";
import {PokerLobbyOverviewComponent} from "./lobby-overview/lobby-overview.component";

export const lobbyRoutes: Routes = [
    {path: "", redirectTo: "/lobbies", pathMatch: "full"},
    {path: "lobbies", component: PokerLobbyOverviewComponent}
];