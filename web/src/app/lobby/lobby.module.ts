import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PokerLobbyOverviewComponent} from "./lobby-overview/lobby-overview.component";
import {RouterModule} from "@angular/router";
import {lobbyRoutes} from "./lobby.routes";
import {PokerLobbyService} from "./shared/lobby.service";
import {PokerSharedModule} from "../shared/shared.module";
import {StoreModule} from "@ngrx/store";
import {lobbyReducer} from "./state/lobby.reducer";
import {EffectsModule} from "@ngrx/effects";
import {LobbyEffects} from "./state/lobby.effects";
import { PokerLobbyComponent } from "./lobby/lobby.component";
import { PokerLobbyCreateComponent } from './lobby-create/lobby-create.component';
import {GameModule} from "../game/game.module";



@NgModule({
  declarations: [
      PokerLobbyOverviewComponent,
      PokerLobbyComponent,
      PokerLobbyCreateComponent
  ],
  imports: [
    CommonModule,
    GameModule,
    PokerSharedModule,
    StoreModule.forFeature("lobby", lobbyReducer),
    EffectsModule.forFeature([LobbyEffects]),
    RouterModule.forChild(lobbyRoutes)
  ],
  providers: [
    PokerLobbyService
  ],
  exports: [
    PokerLobbyOverviewComponent
  ]
})
export class LobbyModule { }
