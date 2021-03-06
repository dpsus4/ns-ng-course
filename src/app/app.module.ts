import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { DayModalComponent } from './challenges/day-modal/day-modal.component';
import { SharedModule } from './shared/shared.module';
import { NativeScriptFormsModule, NativeScriptHttpClientModule, NativeScriptModule } from '@nativescript/angular';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import {ChallengeActionsModule} from "./challenges/challenge-actions/challenge-actions.module";
import { ReactiveFormsModule } from '@angular/forms';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    NativeScriptUISideDrawerModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    ChallengeActionsModule
  ],
  declarations: [
    AppComponent,
    AuthComponent,
    DayModalComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [DayModalComponent]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
