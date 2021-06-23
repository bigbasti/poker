import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PokerSharedModule} from "../shared/shared.module";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {RouterModule} from "@angular/router";
import {gameRoutes} from "./game.routes";
import {GameEffects} from "./state/game.effects";
import {gameReducer} from "./state/game.reducer";
import {PokerGameService} from "./shared/game.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PokerSharedModule,
    StoreModule.forFeature("game", gameReducer),
    EffectsModule.forFeature([GameEffects]),
    RouterModule.forChild(gameRoutes)
  ],
  providers: [
      PokerGameService
  ]
})
export class GameModule { }
