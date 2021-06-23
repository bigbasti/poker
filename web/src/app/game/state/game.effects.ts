import {Injectable} from "@angular/core";
import {Actions} from "@ngrx/effects";
import {Router} from "@angular/router";
import {PokerGameService} from "../shared/game.service";

@Injectable()
export class GameEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private gameService: PokerGameService
    ) {
    }
}