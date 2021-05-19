import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {PokerEnvironmentService} from "./services/environmant.service";
import {PokerTextService} from "./services/text.service";



@NgModule({
  declarations: [],
  providers: [
      PokerEnvironmentService,
      PokerTextService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule,
  ]
})
export class PokerSharedModule { }
