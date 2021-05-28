import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PokerLobbyOverviewComponent} from "./lobby-overview/lobby-overview.component";
import {RouterModule} from "@angular/router";
import {lobbyRoutes} from "./lobby.routes";



@NgModule({
  declarations: [
      PokerLobbyOverviewComponent
  ],
  imports: [
    CommonModule,
      RouterModule.forChild(lobbyRoutes)
  ],
  providers: [

  ],
  exports: [
    PokerLobbyOverviewComponent
  ]
})
export class LobbyModule { }
