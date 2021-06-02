import { Component, OnInit } from '@angular/core';
import {PokerLobbyService} from "../shared/lobby.service";
import {Store} from "@ngrx/store";
import {map, tap} from "rxjs/operators";
import * as LobbyActions from "../state/lobby.actions"
import {getAvailableLobbies, getAvailableLobbiesError, PokerState} from "../state/lobby.reducer";
import {Observable} from "rxjs";
import {PokerLobby} from "../shared/lobby.model";

@Component({
  selector: 'poker-lobby-overview',
  template: `
    <h1>Offene Spiele</h1>
    <table class="table table-striped" *ngIf="availableLobbies$ | async as availableLobbies">
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Ersteller</th>
        <th scope="col">Belegung</th>
        <th scope="col">Blinds</th>
        <th scope="col">Startgeld</th>
        <th scope="col">Aktion</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let lobby of availableLobbies">
        <td>{{lobby.name}}</td>
        <td>{{lobby.creator.name}}</td>
        <td>{{calculateOccupation(lobby)}} / 8</td>
        <td>{{lobby.smallBlind}} / {{lobby.bigBlind}}</td>
        <td>{{lobby.money}}</td>
        <td><button class="btn btn-primary btn-sm">Beitreten</button></td>
      </tr>
      </tbody>
    </table>
  `,
  styles: [
  ]
})
export class PokerLobbyOverviewComponent implements OnInit {

  // allLobbys$ = this.lobbyService.getAllLobbies$;

  availableLobbies$ = this.store.select(getAvailableLobbies);
  availableLobbiesError$ = this.store.select(getAvailableLobbiesError).pipe(
      tap(err => console.error(err))
  );

  constructor(
      private lobbyService: PokerLobbyService,
      private store: Store<PokerState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(LobbyActions.loadAvailableLobbies());
  }

  calculateOccupation(lobby: PokerLobby) {
    let occupied = 0;
    for (let i = 1; i <= 8; i++) {
      if (lobby["player" + i]) {occupied++;}
    }
    return occupied;
  }

}
