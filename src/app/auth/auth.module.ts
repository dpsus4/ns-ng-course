import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
} from "@nativescript/angular";
import { AuthComponent } from "./auth.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [AuthComponent],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule.forChild([
            { path: "", component: AuthComponent },
        ]),
        ReactiveFormsModule,
        SharedModule,
    ],
})
export class AuthModule {}
