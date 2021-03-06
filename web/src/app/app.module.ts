import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import localeDE from "@angular/common/locales/de";
import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {appRoutes} from "./app.routes";
import {registerLocaleData} from "@angular/common";
import {PokerSharedModule} from "./shared/shared.module";
import {PokerLoginComponent} from "./login.component";
import {PokerAuthService} from "./shared/services/auth.service";
import {LobbyModule} from "./lobby/lobby.module";
import {Store, StoreModule} from "@ngrx/store";
import {StoreDevtools, StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {EffectsModule} from "@ngrx/effects";
import {appReducer} from "./state/app.reducer";
import {AppEffects} from "./state/app.effects";
import {PokerState} from "./state/app.state";
import {loadUserDetails} from "./state/app.actions";

registerLocaleData(localeDE);

/**
 * method was extracted from the providers to make the authentication registration more readable
 * @param {ZebraAuthService} auth
 * @returns {() => Promise<any>}
 */
export function init_auth(auth: Store<PokerState>) {
  return () => auth.dispatch(loadUserDetails());
}

@NgModule({
  declarations: [
    AppComponent,
    PokerLoginComponent
  ],
  imports: [
    BrowserModule,
    PokerSharedModule,
    LobbyModule,
    StoreModule.forRoot({"app": appReducer}, {}),
    StoreDevtoolsModule.instrument({name: "Poker DevTools", maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([AppEffects]),
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: "reload"}),
  ],
  providers: [
    {provide: LOCALE_ID, useValue: "de"},
    {provide: APP_INITIALIZER, useFactory: init_auth, deps: [Store], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
