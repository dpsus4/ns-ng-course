import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import {AuthGuard} from "./auth/auth.guard";
import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
    { path: "", component: AuthComponent },
    { path: "auth", loadChildren: "", component: AuthComponent },
    {
        path: "challenges",
        loadChildren: "~/app/challenges/challenges.module#ChallengesModule",
        canLoad: [AuthGuard]
    },
    { path: "", redirectTo: "/challenges/tabs", pathMatch: "full" },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
