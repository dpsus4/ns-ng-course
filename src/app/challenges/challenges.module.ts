import { NgModule } from '@angular/core';

import { ChallengesRoutingModule } from './challenges-routing.module';
import { ChallengeTabsComponent } from './challenge-tabs/challenge-tabs.component';
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';
import { TodayComponent } from './today/today.component';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { SharedModule } from '../shared/shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ChallengeEditComponent } from './challenge-edit/challenge-edit.component';
import { ChallengeActionsModule } from './challenge-actions/challenge-actions.module';
import { ChallengeService } from './challenge.service';

@NgModule({
  declarations: [
    ChallengeEditComponent,
    ChallengeTabsComponent,
    CurrentChallengeComponent,
    TodayComponent
  ],
  imports: [NativeScriptCommonModule, ChallengesRoutingModule, SharedModule, ChallengeActionsModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ChallengesModule {}
