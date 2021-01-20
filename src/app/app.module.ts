import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ModalDialogService, NativeScriptFormsModule, NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CurrentChallengeComponent } from './challenges/current-challenge/current-challenge.component';
import { FlexboxComponent } from './layouts/flexbox/flexbox.component';
import { GridComponent } from './layouts/grid/grid.component';
import { AbsoluteComponent } from './layouts/absolute/absolute.component';
import { ChallengeEditComponent } from './challenges/challenge-edit/challenge-edit.component';
import { AuthComponent } from "./auth/auth.component";
import { TodayComponent } from "./challenges/today/today.component";
import { ActionBarComponent } from "./shared/ui/action-bar/action-bar.component";
import {NativeScriptUISideDrawerModule} from 'nativescript-ui-sidedrawer/angular/nativescript-ui-sidedrawer-angular';
import { DayModalComponent } from "./challenges/day-modal/day-modal.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
        CurrentChallengeComponent,
        ChallengeEditComponent,
        FlexboxComponent,
        GridComponent,
        AbsoluteComponent,
        AuthComponent,
        TodayComponent,
        ActionBarComponent,
        DayModalComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [DayModalComponent]
})
export class AppModule { }
