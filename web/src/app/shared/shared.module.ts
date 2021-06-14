import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {PokerEnvironmentService} from "./services/environmant.service";
import {PokerTextService} from "./services/text.service";
import {PokerAuthService} from "./services/auth.service";
import {NoSanitizePipe} from "./pipes/no-sanitize.pipe";
import {ObjToKeysArrayPipe} from "./pipes/obj-to-keys-array.pipe";
import {PokerReactiveInputGroupComponent} from "./controls/reactive-input-group.component";


@NgModule({
    declarations: [
        ObjToKeysArrayPipe,
        NoSanitizePipe,
        PokerReactiveInputGroupComponent
    ],
    providers: [
        PokerEnvironmentService,
        PokerTextService,
        PokerAuthService
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        NgSelectModule,
    ],
    exports: [
        ObjToKeysArrayPipe,
        NoSanitizePipe,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        PokerReactiveInputGroupComponent
    ]
})
export class PokerSharedModule {
}
