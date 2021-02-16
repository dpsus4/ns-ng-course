import { NgModule } from "@angular/core";
import { ChallengeActionsComponent } from "./challenge-actions.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

@NgModule({
    declarations: [ChallengeActionsComponent],
    exports: [ChallengeActionsComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ChallengeActionsModule {}
