import {Component, OnDestroy, OnInit} from '@angular/core';
import {PokerLobbyService} from "../shared/lobby.service";
import {Store} from "@ngrx/store";
import {map, takeUntil, tap} from "rxjs/operators";
import * as LobbyActions from "../state/lobby.actions"
import {getAvailableLobbies, getAvailableLobbiesError, getCurrentLobby, PokerState} from "../state/lobby.reducer";
import {PokerLobby} from "../shared/lobby.model";
import {combineLatest, Subject} from "rxjs";
import {Router} from "@angular/router";
import {getUser} from "../../state/app.reducer";

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
        <td><button class="btn btn-primary btn-sm" (click)="enterLobby(lobby)">Beitreten</button></td>
      </tr>
      </tbody>
    </table>
  `,
  styles: [
  ]
})
export class PokerLobbyOverviewComponent implements OnInit, OnDestroy {

  // allLobbys$ = this.lobbyService.getAllLobbies$;
  onDestroy$ = new Subject();

  currentUser$ = this.store.select(getUser);
  availableLobbies$ = combineLatest([this.store.select(getAvailableLobbies), this.currentUser$]).pipe(
      tap(() => console.log("loading all lobbies from overview")),
      tap(([lobbies, user]) => {
        const inLobby = lobbies.map(lobby => lobby).find(lobby => lobby.player1?.id === user.id || lobby.player2?.id === user.id || lobby.player3?.id === user.id || lobby.player4?.id === user.id || lobby.player5?.id === user.id || lobby.player6?.id === user.id || lobby.player7?.id === user.id || lobby.player8?.id === user.id);
        if (inLobby) { this.router.navigate(["lobby"]);}
      }),
      map(([lobbies, user]) => lobbies)
  );
  availableLobbiesError$ = this.store.select(getAvailableLobbiesError).pipe(
      tap(err => console.error(err))
  );

  constructor(
      private lobbyService: PokerLobbyService,
      private store: Store<PokerState>,
      private router: Router
  ) { }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
  }

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

  enterLobby(lobby: PokerLobby) {
    this.store.dispatch(LobbyActions.joinPokerLobby({lobby}));
  }
}
