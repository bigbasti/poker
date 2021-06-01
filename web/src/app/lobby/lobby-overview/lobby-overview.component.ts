import { Component, OnInit } from '@angular/core';
import {PokerLobbyService} from "../shared/lobby.service";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import * as LobbyActions from "../state/lobby.actions"
import {getAvailableLobbies, PokerState} from "../state/lobby.reducer";

@Component({
  selector: 'poker-lobby-overview',
  template: `
    <ul *ngIf="availableLobbies$ | async as availableLobbies">
      <li *ngFor="let lobby of availableLobbies">{{lobby.name}}</li>
    </ul>
  `,
  styles: [
  ]
})
export class PokerLobbyOverviewComponent implements OnInit {

  // allLobbys$ = this.lobbyService.getAllLobbies$;

  availableLobbies$ = this.store.select(getAvailableLobbies);

  constructor(
      private lobbyService: PokerLobbyService,
      private store: Store<PokerState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(LobbyActions.loadAvailableLobbies());
  }

}
