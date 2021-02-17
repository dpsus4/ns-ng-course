import { NgModule } from "@angular/core";
import { ChallengeActionsComponent } from "./challenge-actions.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

@NgModule({
    declarations: [ChallengeActionsComponent],
    imports: [NativeScriptCommonModule],
    exports: [ChallengeActionsComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ChallengeActionsModule {}
