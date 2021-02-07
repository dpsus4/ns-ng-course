import { NgModule } from "@angular/core";
import {
    NativeScriptCommonModule,
    NativeScriptRouterModule,
} from "@nativescript/angular";
import { ChallengeEditComponent } from "./challenge-edit.component";
import { SharedModule } from "../../shared/shared.module";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";

@NgModule({
    declarations: [ChallengeEditComponent],
    imports: [
        NativeScriptCommonModule,
        // NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            { path: "", component: ChallengeEditComponent },
        ]),
        SharedModule,
        NativeScriptFormsModule,
    ],
})
export class ChallengeEditModule {}
