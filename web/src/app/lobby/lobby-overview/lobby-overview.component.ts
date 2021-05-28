import { Component, OnInit } from '@angular/core';
import {PokerLobbyService} from "../shared/lobby.service";

@Component({
  selector: 'poker-lobby-overview',
  template: `
    <ul *ngIf="allLobbys$ | async as allLobbys">
      <li *ngFor="let lobby of allLobbys">{{lobby.name}}</li>
    </ul>
  `,
  styles: [
  ]
})
export class PokerLobbyOverviewComponent implements OnInit {

  allLobbys$ = this.lobbyService.getAllLobbies$;

  constructor(
      private lobbyService: PokerLobbyService
  ) { }

  ngOnInit(): void {
  }

}
