import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule, NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CurrentChallengeComponent } from './challenges/current-challenge/current-challenge.component';
import { FlexboxComponent } from './layouts/flexbox/flexbox.component';
import { GridComponent } from './layouts/grid/grid.component';
import { AbsoluteComponent } from './layouts/absolute/absolute.component';
import { ChallengeEditComponent } from './challenges/challenge-edit/challenge-edit.component';
import { AuthComponent } from "./auth/auth.component";
import { TodayComponent } from "./challenges/today/today.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        CurrentChallengeComponent,
        ChallengeEditComponent,
        FlexboxComponent,
        GridComponent,
        AbsoluteComponent,
        AuthComponent,
        TodayComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
