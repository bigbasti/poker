import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeDE from "@angular/common/locales/de";
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {appRoutes} from "./app.routes";
import {registerLocaleData} from "@angular/common";
import {PokerSharedModule} from "./shared/shared.module";
import {PokerLoginComponent} from "./login.component";

registerLocaleData(localeDE);

@NgModule({
  declarations: [
    AppComponent,
    PokerLoginComponent
  ],
  imports: [
    BrowserModule,
    PokerSharedModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: "reload"})
  ],
  providers: [
    {provide: LOCALE_ID, useValue: "de"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
