import { NgModule } from '@angular/core';

import { ChallengesRoutingModule } from './challenges-routing.module';
import { ChallengeTabsComponent } from './challenge-tabs/challenge-tabs.component';
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';
import { TodayComponent } from './today/today.component';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { SharedModule } from '../shared/shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

@NgModule({
  declarations: [
    ChallengeTabsComponent,
    CurrentChallengeComponent,
    TodayComponent
  ],
  imports: [NativeScriptCommonModule, ChallengesRoutingModule, SharedModule]
})
export class ChallengesModule {}
