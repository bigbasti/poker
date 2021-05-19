import {Permission} from "./shared/model/user.model";
import {Routes} from "@angular/router";
import {PokerLoginComponent} from "./login.component";

export const basicReadAccessRoles: Permission[] = [
  Permission.Authenticated
];

export const appRoutes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "home", component: PokerLoginComponent}
];
