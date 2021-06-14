import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {PokerState} from "../../state/app.state";

@Component({
  selector: 'poker-lobby-create',
  template: `
    <main role="main" class="container">
      <h1>Lobby erstellen</h1>
      <div class="col-md-6 offset-3">
        <form (ngSubmit)="createLobby(createLobbyForm.value)" [formGroup]="createLobbyForm">
          <fieldset>
            <poker-reactive-input-group [class]="'small-group'"
                                        [altLabel]="'Lobbyname'"
                                        [label]="'Lobbyname'"
                                        [title]="'Lobbyname'"
                                        [name]="'Lobbyname'"
                                        [required]="true"
                                        [type]="'text'"
                                        formControlName="lobbyName"
                                        [control]="createLobbyForm.controls.lobbyName"></poker-reactive-input-group>
            <p class="text-center">
              <button id="cancel-crate-lobby" class="btn btn-outline-danger" (click)="cancelCreate()">Abbrechen</button>
              <button type="submit" id="submit-create-lobby" class="btn btn-primary"
                      [disabled]="!createLobbyForm.valid || requestInProgress">Erstellen
              </button>
            </p>
          </fieldset>
        </form>
      </div>
    </main>
  `,
  styles: [
  ]
})
export class PokerLobbyCreateComponent implements OnInit {

  public createLobbyForm: FormGroup;
  public requestInProgress: boolean;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder,
      private store: Store<PokerState>
  ) { }

  ngOnInit(): void {
    this.createLobbyForm = this.fb.group({
      lobbyName: new FormControl("", [Validators.required, Validators.maxLength(45), Validators.minLength(5)])
    });
  }

  createLobby(value: any) {

  }

  cancelCreate() {
    this.router.navigate(["home"]);
  }
}
